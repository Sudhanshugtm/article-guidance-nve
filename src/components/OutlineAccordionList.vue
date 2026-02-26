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
        @click="onInsertParagraph(paragraph)"
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
const { insertContent } = useEditorInstance()

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

function onInsertParagraph(paragraph) {
  if (paragraph.content) {
    const html = `<h3>${paragraph.title}</h3><p>${paragraph.content}</p>`
    insertContent(html)
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
