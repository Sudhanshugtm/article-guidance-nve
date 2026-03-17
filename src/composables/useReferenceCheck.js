// ABOUTME: Provides pure publish-time helpers for unresolved placeholders and reference targets.
// ABOUTME: Keeps publish gating deterministic without coupling detection to UI state or labels.

import { computed, ref } from 'vue'
import { isCitationPlaceholderNode } from '../utils/citationPlaceholders.js'

export const MIN_UNCITED_PARAGRAPH_TEXT_LENGTH = 50

function getParagraphRange(paragraphPos, paragraphNode) {
  return {
    from: paragraphPos + 1,
    to: paragraphPos + paragraphNode.nodeSize - 1,
  }
}

function getEnclosingParagraph(doc, pos) {
  if (!doc?.resolve) return null

  const $pos = doc.resolve(pos)

  for (let depth = $pos.depth; depth > 0; depth--) {
    const node = $pos.node(depth)
    if (node.type?.name !== 'paragraph') continue

    const paragraphPos = $pos.before(depth)
    return {
      node,
      pos: paragraphPos,
      range: getParagraphRange(paragraphPos, node),
    }
  }

  return null
}

function countTrailingIgnoredCharacters(textContent) {
  const trimmedEnd = textContent.trimEnd()
  const trailingWhitespaceCount = textContent.length - trimmedEnd.length
  const trailingPunctuationMatch = trimmedEnd.match(/[.,!?;:)\]"'”’]+$/u)
  const trailingPunctuationCount = trailingPunctuationMatch?.[0]?.length || 0

  return trailingWhitespaceCount + trailingPunctuationCount
}

export function buildCitationPlaceholderTarget({ placeholderPos, paragraphRange }) {
  return {
    kind: 'citation-placeholder',
    paragraphRange,
    insertionPos: placeholderPos,
    placeholderPos,
  }
}

export function buildParagraphEndTarget(textContent, paragraphRange) {
  const trailingIgnoredCharacters = countTrailingIgnoredCharacters(textContent)

  return {
    kind: 'paragraph-end',
    paragraphRange,
    insertionPos: paragraphRange.to - trailingIgnoredCharacters,
    placeholderPos: null,
  }
}

export function findFirstPublishPlaceholderTarget(doc) {
  if (!doc?.descendants) return null

  let target = null

  doc.descendants((node, pos) => {
    if (target || node.type?.name !== 'placeholderChip') return !target

    const paragraph = getEnclosingParagraph(doc, pos)
    if (!paragraph) return true

    target = {
      chipPos: pos,
      paragraphPos: paragraph.pos,
      paragraphRange: paragraph.range,
    }
    return false
  })

  return target
}

export function findFirstCitationPlaceholderTarget(doc) {
  if (!doc?.descendants) return null

  let target = null

  doc.descendants((node, pos) => {
    if (target || !isCitationPlaceholderNode(node)) return !target

    const paragraph = getEnclosingParagraph(doc, pos)
    if (!paragraph) return true

    target = buildCitationPlaceholderTarget({
      placeholderPos: pos,
      paragraphRange: paragraph.range,
    })
    return false
  })

  return target
}

export function isQualifyingUncitedParagraph(node) {
  if (!node || node.type?.name !== 'paragraph') return false
  if ((node.textContent || '').trim().length < MIN_UNCITED_PARAGRAPH_TEXT_LENGTH) return false

  let hasCitation = false
  let hasCitationPlaceholder = false
  let hasContentPlaceholder = false

  node.descendants((child) => {
    if (child.type?.name === 'placeholderChip') {
      hasContentPlaceholder = true
      return false
    }

    if (isCitationPlaceholderNode(child)) {
      hasCitationPlaceholder = true
      return false
    }

    if (child.type?.name === 'citationSuperscript') {
      hasCitation = true
      return false
    }

    return true
  })

  return !hasCitation && !hasCitationPlaceholder && !hasContentPlaceholder
}

export function findFirstQualifyingUncitedParagraphTarget(doc) {
  if (!doc?.forEach) return null

  let target = null

  doc.forEach((node, offset) => {
    if (target || !isQualifyingUncitedParagraph(node)) return

    target = buildParagraphEndTarget(node.textContent || '', getParagraphRange(offset, node))
  })

  return target
}

export function findFirstReferenceTarget(doc) {
  return (
    findFirstCitationPlaceholderTarget(doc) ||
    findFirstQualifyingUncitedParagraphTarget(doc)
  )
}

export function createReferenceCheckState() {
  const phase = ref('idle')
  const activeTarget = ref(null)
  const selectedReason = ref(null)

  const isReferenceChoiceVisible = computed(() => phase.value === 'awaiting-reference-choice')
  const isReferenceReasonVisible = computed(() => phase.value === 'awaiting-reference-reason')

  function reset() {
    phase.value = 'idle'
    activeTarget.value = null
    selectedReason.value = null
  }

  function beginChecking() {
    phase.value = 'checking'
    activeTarget.value = null
    selectedReason.value = null
  }

  function showReferenceChoice(target) {
    activeTarget.value = target
    selectedReason.value = null
    phase.value = 'awaiting-reference-choice'
  }

  function dismissChoice() {
    reset()
  }

  function rejectReference() {
    if (!activeTarget.value) return
    phase.value = 'awaiting-reference-reason'
  }

  function dismissReason() {
    reset()
  }

  function chooseReason(reason) {
    if (!activeTarget.value) return
    selectedReason.value = reason
    phase.value = 'resolved'
  }

  function beginCiteDialog() {
    if (!activeTarget.value) return false
    phase.value = 'awaiting-cite-dialog'
    return true
  }

  function cancelCiteDialog() {
    reset()
  }

  function resolveAfterCitation() {
    reset()
  }

  function resolvePublishAttempt() {
    phase.value = 'resolved'
  }

  return {
    phase,
    activeTarget,
    selectedReason,
    isReferenceChoiceVisible,
    isReferenceReasonVisible,
    beginChecking,
    showReferenceChoice,
    dismissChoice,
    rejectReference,
    dismissReason,
    chooseReason,
    beginCiteDialog,
    cancelCiteDialog,
    resolveAfterCitation,
    resolvePublishAttempt,
    reset,
  }
}

const sharedReferenceCheckState = createReferenceCheckState()

export function useReferenceCheck() {
  return sharedReferenceCheckState
}
