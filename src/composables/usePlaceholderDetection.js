import { ref, shallowRef } from 'vue'

const isPlaceholderCardVisible = ref(false)
const activePlaceholderDetectionId = ref(null)
const activePlaceholderDetectionRange = ref(null)
const placeholderDetectionRect = shallowRef(null)

/**
 * Check if a paragraph node contains any placeholderChip nodes.
 */
function paragraphHasPlaceholders(node) {
  let found = false
  node.descendants((child) => {
    if (child.type.name === 'placeholderChip') {
      found = true
      return false // stop traversal
    }
  })
  return found
}

/**
 * Check the paragraph at the given position for unfilled placeholders.
 * Called when the cursor leaves a paragraph (from onSelectionUpdate).
 * Sets subtle highlight on placeholder chips + stores range for rail indicator.
 * Does NOT show the card.
 */
function triggerPlaceholderDetection(editor, paragraphPos) {
  try {
    const node = editor.state.doc.nodeAt(paragraphPos)
    if (!node || node.type.name !== 'paragraph' || node.content.size === 0) return

    if (!paragraphHasPlaceholders(node)) return

    // Skip if we already have an active detection (prevents duplicate triggers)
    if (activePlaceholderDetectionId.value) return

    const detectionId = 'pd-' + Math.random().toString(36).slice(2, 8)
    const from = paragraphPos + 1
    const to = paragraphPos + node.nodeSize - 1

    editor.commands.setPlaceholderDetectionHighlights({ from, to, detectionId })

    activePlaceholderDetectionId.value = detectionId
    activePlaceholderDetectionRange.value = { from, to }
  } catch {
    // Position may be invalid after doc changes
  }
}

/**
 * Compute visual position of the active detected paragraph for rail indicator positioning.
 */
function updatePlaceholderDetectionRect(editor) {
  if (!activePlaceholderDetectionRange.value || !editor) {
    placeholderDetectionRect.value = null
    return
  }

  try {
    const { from, to } = activePlaceholderDetectionRange.value
    const startCoords = editor.view.coordsAtPos(from)
    const endCoords = editor.view.coordsAtPos(to)
    const top = startCoords.top
    const bottom = endCoords.bottom
    placeholderDetectionRect.value = {
      top,
      bottom,
      height: bottom - top,
      visible: true,
    }
  } catch {
    placeholderDetectionRect.value = null
  }
}

/**
 * Show the complete section card when the rail indicator is clicked.
 * Promotes placeholder chip highlights to warning style.
 */
function showPlaceholderCard(detectionId, editor) {
  activePlaceholderDetectionId.value = detectionId
  isPlaceholderCardVisible.value = true
  if (editor) editor.commands.promotePlaceholderDetection(detectionId)
}

/**
 * User clicked "Edit" — move cursor before the first placeholder chip,
 * clear highlights, dismiss card.
 */
function editPlaceholder(editor) {
  if (activePlaceholderDetectionRange.value) {
    const { from, to } = activePlaceholderDetectionRange.value
    // Find the first placeholderChip node in the range
    let firstChipPos = null
    editor.state.doc.nodesBetween(from, to, (node, pos) => {
      if (firstChipPos === null && node.type.name === 'placeholderChip') {
        firstChipPos = pos
        return false
      }
    })
    if (firstChipPos !== null) {
      editor.chain().focus().setTextSelection(firstChipPos).run()
    }
  }
  if (activePlaceholderDetectionId.value) {
    editor.commands.clearPlaceholderDetection(activePlaceholderDetectionId.value)
  }
  isPlaceholderCardVisible.value = false
  activePlaceholderDetectionId.value = null
  activePlaceholderDetectionRange.value = null
  placeholderDetectionRect.value = null
}

/**
 * User dismissed the card without acting — demote highlights back to subtle.
 */
function dismissPlaceholderCard(editor) {
  isPlaceholderCardVisible.value = false
  if (editor && activePlaceholderDetectionId.value) {
    editor.commands.demotePlaceholderDetection(activePlaceholderDetectionId.value)
  }
}

export function usePlaceholderDetection() {
  return {
    isPlaceholderCardVisible,
    activePlaceholderDetectionId,
    activePlaceholderDetectionRange,
    placeholderDetectionRect,
    triggerPlaceholderDetection,
    updatePlaceholderDetectionRect,
    showPlaceholderCard,
    editPlaceholder,
    dismissPlaceholderCard,
  }
}
