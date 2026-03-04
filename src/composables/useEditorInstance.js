import { shallowRef, ref } from 'vue'

const editorInstance = shallowRef(null)
const hasContent = ref(false)
const citationClickCount = ref(0)

export function useEditorInstance() {
  function setEditor(editor) {
    editorInstance.value = editor
  }

  function getEditor() {
    return editorInstance.value
  }

  function insertContent(content) {
    const editor = editorInstance.value
    if (!editor) return
    editor.chain().focus().insertContent(content).run()
  }

  function focus() {
    editorInstance.value?.commands.focus()
  }

  function signalCitationClicked() {
    citationClickCount.value++
  }

  return {
    editorInstance,
    setEditor,
    getEditor,
    insertContent,
    focus,
    hasContent,
    citationClickCount,
    signalCitationClicked,
  }
}
