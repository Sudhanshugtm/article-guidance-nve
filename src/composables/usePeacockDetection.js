import { ref, shallowRef } from 'vue'
import { peacockWords } from '../config/peacockWords'

const pattern = new RegExp('\\b(' + peacockWords.join('|') + ')\\b', 'i')

const isCardVisible = ref(false)
const activeParagraphId = ref(null)
const activeParagraphRange = ref(null)
const peacockParagraphRect = shallowRef(null)

function findPreviousParagraph(editor) {
  const { $from } = editor.state.selection
  const currentNode = $from.parent

  if (currentNode.type.name !== 'paragraph' || currentNode.content.size > 0) {
    return null
  }

  const depth = $from.depth
  const indexInParent = $from.index(depth - 1)
  if (indexInParent === 0) return null

  const parentNode = $from.node(depth - 1)
  let prevIndex = indexInParent - 1
  let prevNode = parentNode.child(prevIndex)

  // Skip over non-paragraph nodes (headings, etc.) to find previous paragraph
  while (prevIndex > 0 && prevNode.type.name !== 'paragraph') {
    prevIndex--
    prevNode = parentNode.child(prevIndex)
  }

  if (prevNode.type.name !== 'paragraph') return null

  // Calculate the position of the previous paragraph
  let pos = $from.start(depth - 1)
  for (let i = 0; i < prevIndex; i++) {
    pos += parentNode.child(i).nodeSize
  }

  return { node: prevNode, pos }
}

function findPreviousParagraphFromCursor(editor) {
  const { $from } = editor.state.selection
  const depth = $from.depth
  const indexInParent = $from.index(depth - 1)
  if (indexInParent === 0) return null

  const parentNode = $from.node(depth - 1)
  let prevIndex = indexInParent - 1
  let prevNode = parentNode.child(prevIndex)

  while (prevIndex > 0 && prevNode.type.name !== 'paragraph') {
    prevIndex--
    prevNode = parentNode.child(prevIndex)
  }

  if (prevNode.type.name !== 'paragraph') return null

  let pos = $from.start(depth - 1)
  for (let i = 0; i < prevIndex; i++) {
    pos += parentNode.child(i).nodeSize
  }

  return { node: prevNode, pos }
}

function triggerDetectionOnInsert(editor) {
  const prev = findPreviousParagraphFromCursor(editor)
  if (!prev) return

  const text = prev.node.textContent
  if (!pattern.test(text)) return

  const paragraphId = 'p-' + Math.random().toString(36).slice(2, 8)
  const from = prev.pos + 1
  const to = prev.pos + prev.node.nodeSize - 1

  editor.commands.setPeacockHighlights([{ from, to, paragraphId }])

  activeParagraphId.value = paragraphId
  activeParagraphRange.value = { from, to }
}

function triggerDetection(editor) {
  const prev = findPreviousParagraph(editor)
  if (!prev) return

  const text = prev.node.textContent
  if (!pattern.test(text)) return

  const paragraphId = 'p-' + Math.random().toString(36).slice(2, 8)
  const from = prev.pos + 1
  const to = prev.pos + prev.node.nodeSize - 1

  editor.commands.setPeacockHighlights([{ from, to, paragraphId }])

  activeParagraphId.value = paragraphId
  activeParagraphRange.value = { from, to }
}

function updatePeacockRect(editor) {
  if (!activeParagraphRange.value || !editor) {
    peacockParagraphRect.value = null
    return
  }

  try {
    const { from, to } = activeParagraphRange.value
    const startCoords = editor.view.coordsAtPos(from)
    const endCoords = editor.view.coordsAtPos(to)
    const top = startCoords.top
    const bottom = endCoords.bottom
    peacockParagraphRect.value = {
      top,
      bottom,
      height: bottom - top,
      visible: true,
    }
  } catch {
    peacockParagraphRect.value = null
  }
}

function showCard(paragraphId, editor) {
  activeParagraphId.value = paragraphId
  isCardVisible.value = true
  if (editor) editor.commands.promotePeacockParagraph(paragraphId)
}

function revise(editor) {
  if (activeParagraphRange.value) {
    const { from, to } = activeParagraphRange.value
    editor.chain().focus().setTextSelection({ from, to }).run()
  }
  if (activeParagraphId.value) {
    editor.commands.clearPeacockParagraph(activeParagraphId.value)
  }
  isCardVisible.value = false
  activeParagraphId.value = null
  activeParagraphRange.value = null
  peacockParagraphRect.value = null
}

function decline(editor) {
  if (activeParagraphId.value) {
    editor.commands.clearPeacockParagraph(activeParagraphId.value)
  }
  isCardVisible.value = false
  activeParagraphId.value = null
  activeParagraphRange.value = null
  peacockParagraphRect.value = null
}

export function usePeacockDetection() {
  return {
    isCardVisible,
    activeParagraphId,
    activeParagraphRange,
    peacockParagraphRect,
    triggerDetection,
    triggerDetectionOnInsert,
    updatePeacockRect,
    showCard,
    revise,
    decline,
  }
}
