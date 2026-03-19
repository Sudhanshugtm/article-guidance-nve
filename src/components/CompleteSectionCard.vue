<template>
  <EditCheckCard
    :title="locale.editChecks.completeSection.title"
    :visible="isPlaceholderCardVisible"
    @close="onDismiss"
  >
    <template #description>
      <p>{{ locale.editChecks.completeSection.description }}</p>
    </template>
    <template #actions>
      <div class="complete-section-buttons">
        <CdxButton @click="onEdit">{{ locale.editChecks.completeSection.confirm }}</CdxButton>
      </div>
    </template>
  </EditCheckCard>
</template>

<script setup>
import { CdxButton } from '@wikimedia/codex'
import EditCheckCard from './EditCheckCard.vue'
import { usePlaceholderDetection } from '../composables/usePlaceholderDetection'
import { useEditorInstance } from '../composables/useEditorInstance'
import { useLocale } from '../composables/useLocale'

const { isPlaceholderCardVisible, editPlaceholder, dismissPlaceholderCard } =
  usePlaceholderDetection()
const { getEditor } = useEditorInstance()
const { locale } = useLocale()

function onEdit() {
  const editor = getEditor()
  if (editor) editPlaceholder(editor)
}

function onDismiss() {
  const editor = getEditor()
  if (editor) dismissPlaceholderCard(editor)
}
</script>

<style scoped>
.complete-section-buttons {
  display: flex;
  gap: var(--spacing-75, 12px);
}
</style>
