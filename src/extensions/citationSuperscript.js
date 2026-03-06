import { Node, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CitationSuperscriptView from '../components/CitationSuperscriptView.vue'
import { CITATION_LABEL } from '../config/articleSections'
import { useCitationRegistry } from '../composables/useCitationRegistry'

export const CitationSuperscript = Node.create({
  name: 'citationSuperscript',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: false,

  addAttributes() {
    return {
      label: { default: CITATION_LABEL },
      citationId: { default: null },
    }
  },

  parseHTML() {
    return [
      { tag: 'span[data-citation-superscript]' },
      { tag: 'sup[data-citation-superscript]' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-citation-superscript': '' }, HTMLAttributes),
      `[${HTMLAttributes.label || CITATION_LABEL}]`,
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(CitationSuperscriptView)
  },

  addProseMirrorPlugins() {
    const { reconcileCitations } = useCitationRegistry()

    return [
      new Plugin({
        key: new PluginKey('citationReconciliation'),
        appendTransaction(transactions, _oldState, newState) {
          const hasDocChange = transactions.some((tr) => tr.docChanged)
          if (!hasDocChange) return null

          // Collect all citationSuperscript nodes with a real citationId (in doc order)
          const seen = new Set()
          const orderedIds = []
          const nodePositions = []

          newState.doc.descendants((node, pos) => {
            if (node.type.name === 'citationSuperscript' && node.attrs.citationId) {
              if (!seen.has(node.attrs.citationId)) {
                seen.add(node.attrs.citationId)
                orderedIds.push(node.attrs.citationId)
              }
              nodePositions.push({ pos, node })
            }
          })

          // Reconcile with the registry (pass document-ordered unique IDs)
          const labelMap = reconcileCitations(orderedIds)

          // Check if any labels need updating
          let needsUpdate = false
          for (const { node } of nodePositions) {
            const expectedLabel = labelMap.get(node.attrs.citationId)
            if (expectedLabel && node.attrs.label !== expectedLabel) {
              needsUpdate = true
              break
            }
          }

          if (!needsUpdate) return null

          // Build a transaction to update stale labels
          const { tr } = newState
          for (const { pos, node } of nodePositions) {
            const expectedLabel = labelMap.get(node.attrs.citationId)
            if (expectedLabel && node.attrs.label !== expectedLabel) {
              tr.setNodeMarkup(pos, null, {
                ...node.attrs,
                label: expectedLabel,
              })
            }
          }

          return tr
        },
      }),
    ]
  },
})
