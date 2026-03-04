<template>
  <div class="verified-facts-cards">
    <CdxCard
      v-for="fact in verifiedFacts"
      :key="fact.title"
      :icon="cdxIconAdd"
      @click="onInsertFact(fact)"
    >
      <template #title>{{ fact.title }}</template>
      <template #description>{{ fact.description }}</template>
      <template #supporting-text>
        <a
          :href="fact.wikidataUrl"
          target="_blank"
          rel="noopener"
          class="reference-link"
          @click.stop
        >
          {{ fact.references.length }} {{ fact.references.length === 1 ? 'reference' : 'references' }}
        </a>
      </template>
    </CdxCard>
  </div>
</template>

<script setup>
import { CdxCard } from '@wikimedia/codex'
import { cdxIconAdd } from '@wikimedia/codex-icons'
import { verifiedFacts } from '../config/verifiedFacts.js'
import { useEditorInstance } from '../composables/useEditorInstance'
import { usePlaceholderInteraction } from '../composables/usePlaceholderInteraction'

const emit = defineEmits(['content-inserted'])
const { getEditor, insertContent } = useEditorInstance()
const { activePlaceholderPos, clearActivePlaceholder } = usePlaceholderInteraction()

function onInsertFact(fact) {
  const chipPos = activePlaceholderPos.value
  const editor = getEditor()

  if (chipPos !== null && editor) {
    const node = editor.state.doc.nodeAt(chipPos)
    if (node?.type.name === 'placeholderChip') {
      editor
        .chain()
        .focus()
        .command(({ tr }) => {
          tr.delete(chipPos, chipPos + node.nodeSize)
          return true
        })
        .insertContentAt(chipPos, fact.title)
        .run()
      clearActivePlaceholder()
      emit('content-inserted')
      return
    }
  }

  insertContent(fact.title)
  emit('content-inserted')
}
</script>

<style scoped>
.verified-facts-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-75);
}

.verified-facts-cards :deep(.cdx-card) {
  background-color: var(--background-color-transparent);
}

.reference-link {
  color: var(--color-progressive);
  text-decoration: none;
}

.reference-link:hover {
  text-decoration: underline;
}
</style>
