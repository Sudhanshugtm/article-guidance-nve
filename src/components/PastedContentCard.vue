<template>
  <EditCheckCard
    :title="locale.editChecks.pastedContent.title"
    :visible="isPasteCardVisible"
    @close="onDismiss"
  >
    <template #description>
      <p>
        {{ locale.editChecks.pastedContent.descriptionPrefix }}
        <a
          href="https://en.wikipedia.org/wiki/Wikipedia:Copyright_violations"
          target="_blank"
          rel="noopener"
        >
          {{ locale.editChecks.pastedContent.descriptionLinkText }}
        </a>
        {{ locale.editChecks.pastedContent.descriptionSuffix }}
      </p>
    </template>
    <template #actions>
      <p class="paste-question">{{ locale.editChecks.pastedContent.question }}</p>
      <div class="paste-buttons">
        <CdxButton @click="onYes">{{ locale.editChecks.pastedContent.keep }}</CdxButton>
        <CdxButton @click="onNo">{{ locale.editChecks.pastedContent.remove }}</CdxButton>
      </div>
    </template>
  </EditCheckCard>
</template>

<script setup>
import { CdxButton } from '@wikimedia/codex'
import EditCheckCard from './EditCheckCard.vue'
import { usePasteDetection } from '../composables/usePasteDetection'
import { useEditorInstance } from '../composables/useEditorInstance'
import { useLocale } from '../composables/useLocale'

const { isPasteCardVisible, confirmPaste, rejectPaste, dismissPaste } = usePasteDetection()
const { getEditor } = useEditorInstance()
const { locale } = useLocale()

function onYes() {
  const editor = getEditor()
  if (editor) confirmPaste(editor)
}

function onNo() {
  const editor = getEditor()
  if (editor) rejectPaste(editor)
}

function onDismiss() {
  const editor = getEditor()
  if (editor) dismissPaste(editor)
}
</script>

<style scoped>
.paste-question {
  margin: 0 0 var(--spacing-25) 0;
  font-weight: var(--font-weight-bold, 700);
  font-size: var(--font-size-medium, 16px);
  line-height: var(--line-height-small, 22px);
  color: var(--color-subtle, #54595d);
}

.paste-buttons {
  display: flex;
  gap: var(--spacing-75, 12px);
}
</style>
