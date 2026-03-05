import { ref, computed, watch } from 'vue'
import { usePeacockDetection } from './usePeacockDetection'
import { usePasteDetection } from './usePasteDetection'
import { usePlaceholderDetection } from './usePlaceholderDetection'

const currentCheckIndex = ref(0)
const cursorInCheckParagraph = ref(false)

export function useEditCheckPagination() {
  const {
    peacockParagraphRect,
    activeParagraphId,
    activeParagraphRange,
    isCardVisible,
    showCard: showPeacockCard,
    dismissCard: dismissPeacock,
  } = usePeacockDetection()

  const {
    pasteParagraphRect,
    activePastedParagraphId,
    activePastedRange,
    isPasteCardVisible,
    showPasteCard,
    dismissPaste,
  } = usePasteDetection()

  const {
    placeholderDetectionRect,
    activePlaceholderDetectionId,
    activePlaceholderDetectionRange,
    isPlaceholderCardVisible,
    showPlaceholderCard,
    dismissPlaceholderCard,
  } = usePlaceholderDetection()

  // Collect active checks in fixed order: peacock → paste → placeholder
  const activeChecks = computed(() => {
    const checks = []
    if (peacockParagraphRect.value?.visible) {
      checks.push({ type: 'peacock', range: activeParagraphRange.value })
    }
    if (pasteParagraphRect.value?.visible) {
      checks.push({ type: 'paste', range: activePastedRange.value })
    }
    if (placeholderDetectionRect.value?.visible) {
      checks.push({ type: 'placeholder', range: activePlaceholderDetectionRange.value })
    }
    return checks
  })

  const totalChecks = computed(() => activeChecks.value.length)

  // Union of all active rects for positioning the single rail indicator
  const unifiedRailRect = computed(() => {
    const rects = []
    if (peacockParagraphRect.value?.visible) rects.push(peacockParagraphRect.value)
    if (pasteParagraphRect.value?.visible) rects.push(pasteParagraphRect.value)
    if (placeholderDetectionRect.value?.visible) rects.push(placeholderDetectionRect.value)
    if (rects.length === 0) return null

    const top = Math.min(...rects.map((r) => r.top))
    const bottom = Math.max(...rects.map((r) => r.bottom))
    return { top, bottom, height: bottom - top, visible: true }
  })

  // Reset index when checks change
  watch(totalChecks, (n) => {
    if (currentCheckIndex.value >= n) {
      currentCheckIndex.value = Math.max(0, n - 1)
    }
  })

  function dismissAllCards(editor) {
    if (isCardVisible.value) dismissPeacock(editor)
    if (isPasteCardVisible.value) dismissPaste(editor)
    if (isPlaceholderCardVisible.value) dismissPlaceholderCard(editor)
  }

  function showCheckByType(type, editor) {
    if (type === 'peacock') showPeacockCard(activeParagraphId.value, editor)
    else if (type === 'paste') showPasteCard(activePastedParagraphId.value, editor)
    else if (type === 'placeholder')
      showPlaceholderCard(activePlaceholderDetectionId.value, editor)
  }

  function showCheckAtIndex(index, editor) {
    dismissAllCards(editor)
    currentCheckIndex.value = index
    const check = activeChecks.value[index]
    if (check) showCheckByType(check.type, editor)
  }

  function goToNext(editor) {
    if (currentCheckIndex.value < totalChecks.value - 1) {
      showCheckAtIndex(currentCheckIndex.value + 1, editor)
    }
  }

  function goToPrev(editor) {
    if (currentCheckIndex.value > 0) {
      showCheckAtIndex(currentCheckIndex.value - 1, editor)
    }
  }

  const isAnyCardActive = computed(() => {
    return isCardVisible.value || isPasteCardVisible.value || isPlaceholderCardVisible.value
  })

  function updateCursorInCheck(editor) {
    if (!editor) {
      cursorInCheckParagraph.value = false
      return
    }
    const pos = editor.state.selection.from
    for (const check of activeChecks.value) {
      if (check.range && pos >= check.range.from && pos <= check.range.to) {
        cursorInCheckParagraph.value = true
        return
      }
    }
    cursorInCheckParagraph.value = false
  }

  return {
    activeChecks,
    totalChecks,
    currentCheckIndex,
    unifiedRailRect,
    isAnyCardActive,
    cursorInCheckParagraph,
    showCheckAtIndex,
    goToNext,
    goToPrev,
    dismissAllCards,
    updateCursorInCheck,
  }
}
