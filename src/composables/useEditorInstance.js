import { shallowRef } from 'vue'

const editorInstance = shallowRef(null)

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

  return { editorInstance, setEditor, getEditor, insertContent, focus }
}
