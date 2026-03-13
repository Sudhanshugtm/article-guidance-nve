<template>
  <CdxAccordion
    v-for="(section, index) in localizedSections"
    :key="index"
    :class="{ 'accordion--empty': isSectionEmpty(section) }"
    separation="none"
    :model-value="accordionStates[index]"
    :action-icon="shouldShowSectionAddAction(section, index) ? cdxIconAdd : null"
    :action-always-visible="shouldShowSectionAddAction(section, index)"
    :action-button-label="
      shouldShowSectionAddAction(section, index)
        ? locale.outline.addSectionLabel.replace('{section title}', section.title)
        : null
    "
    @update:model-value="(val) => updateAccordionState(index, val)"
    @action-button-click="onInsertSectionHeading(section, index)"
  >
    <template #title>{{ section.title }}</template>
    <template #description>{{ section.description }}</template>
    <div v-if="section.paragraphs && section.paragraphs.length" class="paragraph-cards">
      <CdxCard
        v-for="(paragraph, pIndex) in section.paragraphs"
        :key="pIndex"
        :icon="cdxIconAdd"
        @click="onInsertParagraph(section, index, paragraph)"
      >
        <template #title>{{ paragraph.title }}</template>
        <template #description>{{ paragraph.description }}</template>
      </CdxCard>
    </div>
  </CdxAccordion>
</template>

<script setup>
import { computed } from 'vue'
import { CdxAccordion, CdxCard } from '@wikimedia/codex'
import { cdxIconAdd } from '@wikimedia/codex-icons'
import { CITATION_LABEL } from '../config/articleSections.js'
import { useTopicContent } from '../composables/useTopicContent'
import { useEditorInstance } from '../composables/useEditorInstance'
import { useAccordionState } from '../composables/useAccordionState'
import { useLocale } from '../composables/useLocale'
import { usePlaceholderInteraction } from '../composables/usePlaceholderInteraction'
import { findReusableSectionParagraphRange } from '../utils/outlineInsertion'
import { getCitationPlaceholderLabel } from '../utils/citationPlaceholders'

const emit = defineEmits(['content-inserted'])
const { getEditor, activatePlaceholder } = useEditorInstance()
const { accordionStates, updateAccordionState } = useAccordionState()
const { locale } = useLocale()
const { sections: topicSections, isCoffeeTopic } = useTopicContent()
const { clearActivePlaceholder } = usePlaceholderInteraction()

// Merge locale-translated titles/descriptions with topic-specific content templates.
// For coffee topics, use locale.coffeeSections; for others, use locale.sections.
const localizedSections = computed(() => {
  const ls = isCoffeeTopic.value ? locale.value.coffeeSections : locale.value.sections
  if (!ls) return topicSections.value
  return topicSections.value.map((section, i) => ({
    ...section,
    title: ls[i]?.title || section.title,
    description: ls[i]?.description || section.description,
    paragraphs: section.paragraphs?.map((para, j) => ({
      ...para,
      title: ls[i]?.paragraphs?.[j]?.title || para.title,
      description: ls[i]?.paragraphs?.[j]?.description || para.description,
      content: ls[i]?.paragraphs?.[j]?.content || para.content,
    })),
  }))
})

function isSectionEmpty(section) {
  return !section.paragraphs || section.paragraphs.length === 0
}

function shouldShowSectionAddAction(section, index) {
  if (index === 0) return false
  return isSectionEmpty(section) || accordionStates.value[index]
}

function onInsertSectionHeading(section, index) {
  if (!shouldShowSectionAddAction(section, index)) return
  const editor = getEditor()
  if (!editor) return

  clearActivePlaceholder()

  const endPos = editor.state.doc.content.size
  editor
    .chain()
    .focus(endPos)
    .insertContentAt(endPos, [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: section.title }],
      },
      { type: 'paragraph' },
    ])
    .run()

  const firstChild = editor.state.doc.firstChild
  if (firstChild?.type.name === 'paragraph' && firstChild.content.size === 0) {
    editor.commands.deleteRange({ from: 0, to: firstChild.nodeSize })
  }

  emit('content-inserted')
}

function parsePlaceholders(text) {
  const localizedCitationLabel = getCitationPlaceholderLabel(locale.value)
  const citationMarkers = [...new Set([CITATION_LABEL, localizedCitationLabel])].map(
    (label) => `[${label}]`,
  )
  const escapedCitationMarkers = citationMarkers
    .map((marker) => marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const parts = text.split(new RegExp(`(\\{\\{[^}]+\\}\\}|${escapedCitationMarkers})`))
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const placeholderMatch = part.match(/^\{\{(.+)\}\}$/)
      if (placeholderMatch) {
        return { type: 'placeholderChip', attrs: { label: placeholderMatch[1] } }
      }
      if (citationMarkers.includes(part)) {
        return {
          type: 'citationSuperscript',
          attrs: {
            label: localizedCitationLabel,
            isPlaceholder: true,
          },
        }
      }
      return { type: 'text', text: part }
    })
}

function editorHasH2(title) {
  const editor = getEditor()
  if (!editor) return false
  let found = false
  editor.state.doc.descendants((node) => {
    if (node.type.name === 'heading' && node.attrs.level === 2 && node.textContent === title) {
      found = true
      return false
    }
  })
  return found
}

function onInsertParagraph(section, index, paragraph) {
  if (paragraph.content) {
    const editor = getEditor()
    if (!editor) return

    clearActivePlaceholder()

    const contentNodes = parsePlaceholders(paragraph.content)
    const paragraphNode = { type: 'paragraph', content: contentNodes }
    const nodes = []
    if (index !== 0 && !editorHasH2(section.title)) {
      nodes.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: section.title }],
      })
    }
    nodes.push(paragraphNode)

    let searchFrom = 0
    let searchTo = 0
    const reusableSectionParagraph = findReusableSectionParagraphRange(
      editor.state.doc,
      section.title,
    )

    if (reusableSectionParagraph) {
      editor
        .chain()
        .focus(reusableSectionParagraph.from)
        .deleteRange({
          from: reusableSectionParagraph.from,
          to: reusableSectionParagraph.to,
        })
        .insertContentAt(reusableSectionParagraph.from, paragraphNode)
        .run()
      searchFrom = reusableSectionParagraph.from
      const insertedParagraph = editor.state.doc.nodeAt(reusableSectionParagraph.from)
      searchTo = insertedParagraph
        ? reusableSectionParagraph.from + insertedParagraph.nodeSize
        : reusableSectionParagraph.from
    } else {
      // Insert at end of document so we don't split the paragraph the cursor is in
      const endPos = editor.state.doc.content.size
      editor.chain().focus(endPos).insertContentAt(endPos, nodes).run()
      searchFrom = endPos
      searchTo = editor.state.doc.content.size

      // Remove leading empty paragraph left over from the initial editor state
      const firstChild = editor.state.doc.firstChild
      if (firstChild?.type.name === 'paragraph' && firstChild.content.size === 0) {
        const removedLeadingParagraphSize = firstChild.nodeSize
        editor.commands.deleteRange({ from: 0, to: firstChild.nodeSize })
        searchFrom = Math.max(0, searchFrom - removedLeadingParagraphSize)
        searchTo = Math.max(searchFrom, searchTo - removedLeadingParagraphSize)
      }
    }

    // Move cursor to first placeholder chip in the newly inserted content
    let firstChipPos = null
    editor.state.doc.nodesBetween(searchFrom, searchTo, (node, pos) => {
      if (firstChipPos === null && node.type.name === 'placeholderChip') {
        firstChipPos = pos
        return false
      }
    })
    if (firstChipPos !== null) {
      activatePlaceholder(firstChipPos, editor)
    }

    emit('content-inserted')
  }
}
</script>

<style scoped>
.paragraph-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-75);
}

.paragraph-cards :deep(.cdx-card) {
  background-color: var(--background-color-transparent);
}

.accordion--empty :deep(> summary::before) {
  opacity: 0;
}

.accordion--empty :deep(> summary) {
  cursor: default;
  pointer-events: none;
}

.accordion--empty :deep(> summary .cdx-accordion__action) {
  pointer-events: auto;
  cursor: pointer;
}
</style>
