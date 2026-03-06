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
import { useCitationRegistry } from '../composables/useCitationRegistry'

const emit = defineEmits(['content-inserted'])
const { getEditor, insertContent } = useEditorInstance()
const { activePlaceholderPos, clearActivePlaceholder } = usePlaceholderInteraction()
const { insertCitation } = useCitationRegistry()

function onInsertFact(fact) {
  const chipPos = activePlaceholderPos.value
  const editor = getEditor()

  // Build citation superscript nodes for each reference
  const citationNodes = fact.references.map((ref) => {
    const citation = {
      id: `fact-ref-${ref.url}`,
      segments: [{ text: ref.url, style: 'link' }],
    }
    const refNumber = insertCitation(citation)
    return {
      type: 'citationSuperscript',
      attrs: { label: String(refNumber) },
    }
  })

  // Build content: fact title text + citation superscripts
  const contentNodes = [{ type: 'text', text: fact.title }, ...citationNodes]

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
        .insertContentAt(chipPos, contentNodes)
        .run()
      clearActivePlaceholder()
      emit('content-inserted')
      return
    }
  }

  insertContent(contentNodes)
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
