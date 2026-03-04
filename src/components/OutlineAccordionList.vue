<template>
  <CdxAccordion
    v-for="(section, index) in articleSections"
    :key="section.title"
    :class="{ 'accordion--empty': isSectionEmpty(section) }"
    separation="none"
    :model-value="accordionStates[section.title]"
    :action-icon="index === 0 ? null : cdxIconAdd"
    :action-always-visible="index !== 0 && isSectionEmpty(section)"
    :action-button-label="`Add ${section.title} section`"
    @update:model-value="(val) => onAccordionUpdate(section, val)"
    @action-button-click="onInsertSectionHeading(section)"
  >
    <template #title>{{ section.title }}</template>
    <template #description>{{ section.description }}</template>
    <div v-if="section.paragraphs && section.paragraphs.length" class="paragraph-cards">
      <CdxCard
        v-for="paragraph in section.paragraphs"
        :key="paragraph.title"
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
import { ref } from 'vue'
import { CdxAccordion, CdxCard } from '@wikimedia/codex'
import { cdxIconAdd } from '@wikimedia/codex-icons'
import { articleSections } from '../config/articleSections.js'
import { useEditorInstance } from '../composables/useEditorInstance'

const emit = defineEmits(['content-inserted'])
const { insertContent, getEditor } = useEditorInstance()

const accordionStates = ref(
  Object.fromEntries(articleSections.map((section, index) => [section.title, index === 0])),
)

function isSectionEmpty(section) {
  return !section.paragraphs || section.paragraphs.length === 0
}

function onAccordionUpdate(section, newValue) {
  if (isSectionEmpty(section) && newValue) return
  accordionStates.value[section.title] = newValue
}

function onInsertSectionHeading(section) {
  insertContent(`<h2>${section.title}</h2><p></p>`)
  emit('content-inserted')
}

function parsePlaceholders(text) {
  const parts = text.split(/(\{\{[^}]+\}\})/)
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const match = part.match(/^\{\{(.+)\}\}$/)
      if (match) {
        return { type: 'placeholderChip', attrs: { label: match[1] } }
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
