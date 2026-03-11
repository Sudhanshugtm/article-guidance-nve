<template>
  <CdxAccordion
    v-for="(section, index) in localizedSections"
    :key="index"
    :class="{ 'accordion--empty': isSectionEmpty(section) }"
    separation="none"
    :model-value="accordionStates[index]"
    :action-icon="index === 0 ? null : cdxIconAdd"
    :action-always-visible="index !== 0"
    :action-button-label="locale.outline.addSectionLabel.replace('{section title}', section.title)"
    @update:model-value="(val) => updateAccordionState(index, val)"
    @action-button-click="onInsertSectionHeading(section)"
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
import { articleSections, CITATION_LABEL } from '../config/articleSections.js'
import { useEditorInstance } from '../composables/useEditorInstance'
import { useAccordionState } from '../composables/useAccordionState'
import { useLocale } from '../composables/useLocale'

const emit = defineEmits(['content-inserted'])
const { insertContent, getEditor } = useEditorInstance()
const { accordionStates, updateAccordionState } = useAccordionState()
const { locale } = useLocale()

// Merge locale-translated titles/descriptions with articleSections content templates
const localizedSections = computed(() => {
  const ls = locale.value.sections
  if (!ls) return articleSections
  return articleSections.map((section, i) => ({
    ...section,
    title: ls[i]?.title || section.title,
    description: ls[i]?.description || section.description,
    paragraphs: section.paragraphs?.map((para, j) => ({
      ...para,
      title: ls[i]?.paragraphs?.[j]?.title || para.title,
      description: ls[i]?.paragraphs?.[j]?.description || para.description,
    })),
  }))
})

function isSectionEmpty(section) {
  return !section.paragraphs || section.paragraphs.length === 0
}

function onInsertSectionHeading(section) {
  insertContent(`<h2>${section.title}</h2><p></p>`)
  emit('content-inserted')
}

function parsePlaceholders(text) {
  const citationMarker = `[${CITATION_LABEL}]`
  const parts = text.split(new RegExp(`(\\{\\{[^}]+\\}\\}|\\[${CITATION_LABEL}\\])`))
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const placeholderMatch = part.match(/^\{\{(.+)\}\}$/)
      if (placeholderMatch) {
        return { type: 'placeholderChip', attrs: { label: placeholderMatch[1] } }
      }
      if (part === citationMarker) {
        return { type: 'citationSuperscript', attrs: { label: CITATION_LABEL } }
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
    const contentNodes = parsePlaceholders(paragraph.content)
    const nodes = []
    if (index !== 0 && !editorHasH2(section.title)) {
      nodes.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: section.title }],
      })
    }
    nodes.push({ type: 'paragraph', content: contentNodes })
    insertContent(nodes)
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
