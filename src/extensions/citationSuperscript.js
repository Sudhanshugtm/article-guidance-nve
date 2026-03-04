import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CitationSuperscriptView from '../components/CitationSuperscriptView.vue'
import { CITATION_LABEL } from '../config/articleSections'

export const CitationSuperscript = Node.create({
  name: 'citationSuperscript',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: false,

  addAttributes() {
    return {
      label: { default: CITATION_LABEL },
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
})
