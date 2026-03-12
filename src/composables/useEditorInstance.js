import { shallowRef, ref } from 'vue'
import { usePlaceholderInteraction } from './usePlaceholderInteraction'
import { useEditorSettings } from './useEditorSettings'

const editorInstance = shallowRef(null)
const hasContent = ref(false)
const canUndo = ref(false)
const citationClickCount = ref(0)

export function useEditorInstance() {
  const { setActivePlaceholder, markActivePlaceholderSettled } = usePlaceholderInteraction()
  const { settings } = useEditorSettings()

  function setEditor(editor) {
    editorInstance.value = editor
    updateUndoAvailability(editor)
  }

  function getEditor() {
    return editorInstance.value
  }

  function activatePlaceholder(chipPos, editor = editorInstance.value) {
    if (chipPos === null || !editor) return

    const behavior = settings.value.placeholder?.cursorBehavior || 'before'
    const chipNode = editor.state.doc.nodeAt(chipPos)
    if (!chipNode) return

    const targetPos =
      behavior === 'before' ? chipPos : chipPos + chipNode.nodeSize
    setActivePlaceholder(chipPos, behavior)

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        editor.commands.focus()
        editor.commands.setTextSelection(targetPos)
        markActivePlaceholderSettled()
      })
      return
    }

    editor.commands.focus()
    editor.commands.setTextSelection(targetPos)
    markActivePlaceholderSettled()
  }

  function insertContent(content) {
    const editor = editorInstance.value
    if (!editor) return
    const startPos = editor.state.selection.from
    editor.chain().focus().insertContent(content).run()

    const endPos = editor.state.selection.from
    let firstChipPos = null
    editor.state.doc.nodesBetween(startPos, endPos, (node, pos) => {
      if (firstChipPos === null && node.type.name === 'placeholderChip') {
        firstChipPos = pos
        return false
      }
    })

    if (firstChipPos !== null) {
      activatePlaceholder(firstChipPos, editor)
    }
  }

  function focus() {
    editorInstance.value?.commands.focus()
  }

  function updateUndoAvailability(editor = editorInstance.value) {
    canUndo.value = editor ? editor.can().undo() : false
  }

  function signalCitationClicked() {
    citationClickCount.value++
  }

  return {
    editorInstance,
    setEditor,
    getEditor,
    activatePlaceholder,
    insertContent,
    focus,
    hasContent,
    canUndo,
    updateUndoAvailability,
    citationClickCount,
    signalCitationClicked,
  }
}
