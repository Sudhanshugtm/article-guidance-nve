import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import PlaceholderChipView from '../components/PlaceholderChipView.vue'

export const PlaceholderChip = Node.create({
  name: 'placeholderChip',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      label: { default: '' },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-placeholder-chip]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-placeholder-chip': '' }, HTMLAttributes),
      HTMLAttributes.label || '',
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(PlaceholderChipView)
  },

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { state } = editor
        const { selection } = state

        // If NodeSelection on a placeholderChip, delete it
        if (selection.node?.type.name === 'placeholderChip') {
          editor.commands.deleteSelection()
          return true
        }

        // If cursor is right after a placeholderChip, delete it in one press
        const { $from, empty } = selection
        if (empty && $from.nodeBefore?.type.name === 'placeholderChip') {
          const pos = $from.pos - $from.nodeBefore.nodeSize
          editor
            .chain()
            .command(({ tr }) => {
              tr.delete(pos, $from.pos)
              return true
            })
            .run()
          return true
        }

        return false
      },

      Delete: ({ editor }) => {
        const { state } = editor
        const { selection } = state

        // If NodeSelection on a placeholderChip, delete it
        if (selection.node?.type.name === 'placeholderChip') {
          editor.commands.deleteSelection()
          return true
        }

        // If cursor is right before a placeholderChip, delete it in one press
        const { $from, empty } = selection
        if (empty && $from.nodeAfter?.type.name === 'placeholderChip') {
          const pos = $from.pos
          editor
            .chain()
            .command(({ tr }) => {
              tr.delete(pos, pos + $from.nodeAfter.nodeSize)
              return true
            })
            .run()
          return true
        }

        return false
      },
    }
  },
})
