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
          {{ fact.references.length }} {{ fact.references.length === 1 ? locale.counts.reference : locale.counts.references }}
        </a>
      </template>
    </CdxCard>
  </div>
</template>

<script setup>
import { CdxCard } from '@wikimedia/codex'
import { cdxIconAdd } from '@wikimedia/codex-icons'
import { useTopicContent } from '../composables/useTopicContent'

const { facts: verifiedFacts } = useTopicContent()
import { useEditorInstance } from '../composables/useEditorInstance'
import { useLocale } from '../composables/useLocale'
import { usePlaceholderInteraction } from '../composables/usePlaceholderInteraction'
import { useCitationRegistry } from '../composables/useCitationRegistry'
import { isCitationPlaceholderNode } from '../utils/citationPlaceholders.js'

const emit = defineEmits(['content-inserted'])
const { getEditor, insertContent } = useEditorInstance()
const { locale } = useLocale()
const { activePlaceholderPos, clearActivePlaceholder } = usePlaceholderInteraction()
const { insertCitation } = useCitationRegistry()

/**
 * After inserting a verified fact at chipPos, scan the parent paragraph
 * and remove citation placeholder markers whose segment has no remaining
 * placeholder chips. A "segment" is the slice of content leading up to
 * each citation placeholder marker (bounded by the previous marker or the
 * start of the paragraph).
 */
function removeRedundantCiteMarkers(editor, posInParagraph) {
  const $pos = editor.state.doc.resolve(posInParagraph)
  const paragraph = $pos.parent
  const paragraphStart = $pos.start()

  // Walk through paragraph children, segmenting by citation placeholder markers.
  // For each marker, track whether its preceding segment has placeholder chips.
  let segmentHasPlaceholder = false
  const toDelete = []

  paragraph.forEach((child, offset) => {
    if (child.type.name === 'placeholderChip') {
      segmentHasPlaceholder = true
    } else if (isCitationPlaceholderNode(child)) {
      if (!segmentHasPlaceholder) {
        toDelete.push({ from: paragraphStart + offset, size: child.nodeSize })
      }
      // Reset for the next segment
      segmentHasPlaceholder = false
    }
  })

  if (toDelete.length === 0) return

  // Delete in reverse order so positions stay valid
  editor
    .chain()
    .command(({ tr }) => {
      for (const item of toDelete.reverse()) {
        tr.delete(item.from, item.from + item.size)
      }
      return true
    })
    .run()
}

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
      attrs: { label: String(refNumber), citationId: citation.id },
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

      // Clean up citation placeholder markers if all placeholders in this paragraph are filled
      removeRedundantCiteMarkers(editor, chipPos)

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
