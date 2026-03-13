// ABOUTME: Centralizes locale-aware inline citation placeholder labels and detection.
// ABOUTME: Keeps placeholder behavior stable even when the visible label is translated.

import { CITATION_LABEL } from '../config/articleSections.js'

export function getCitationPlaceholderLabel(locale) {
  return locale?.cite?.title || CITATION_LABEL
}

export function isCitationPlaceholderNode(node) {
  if (!node || node.type?.name !== 'citationSuperscript') return false

  if (node.attrs?.isPlaceholder === true) return true

  return node.attrs?.isPlaceholder == null && !node.attrs?.citationId && node.attrs?.label === CITATION_LABEL
}
