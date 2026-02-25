<template>
  <CdxAccordion
    v-for="section in articleSections"
    :key="section.title"
    separation="minimal"
  >
    <template #title>{{ section.title }}</template>
    <template #description>{{ section.description }}</template>
    <div v-if="section.paragraphs" class="paragraph-cards">
      <CdxCard
        v-for="paragraph in section.paragraphs"
        :key="paragraph.title"
        :icon="cdxIconAdd"
      >
        <template #title>{{ paragraph.title }}</template>
        <template #description>{{ paragraph.description }}</template>
      </CdxCard>
    </div>
  </CdxAccordion>
</template>

<script setup>
import { CdxAccordion, CdxCard } from '@wikimedia/codex'
import { cdxIconAdd } from '@wikimedia/codex-icons'
import { articleSections } from '../config/articleSections.js'
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
</style>
