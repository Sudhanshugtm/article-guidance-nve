import { ref, computed } from 'vue'
import { citations as preExistingCitations } from '@/config/citations'

// Available references from config — not yet inserted into editor
const availableCitations = ref([...preExistingCitations])

// Citations that have been inserted into the editor, in insertion order.
// Each entry: { id, segments, referenceNumber }
const usedCitations = ref([])

// Position of the citation superscript node the user clicked (or null for fresh insert)
const clickedCitationPos = ref(null)

export function useCitationRegistry() {
  const nextReferenceNumber = computed(() => usedCitations.value.length + 1)

  /**
   * Mark a citation as used. If it comes from availableCitations, remove it there.
   * Idempotent: if already used, returns existing number.
   * Returns the assigned reference number.
   */
  function insertCitation(citation) {
    const existing = usedCitations.value.find((c) => c.id === citation.id)
    if (existing) {
      return existing.referenceNumber
    }

    const num = nextReferenceNumber.value
    usedCitations.value.push({
      ...citation,
      referenceNumber: num,
    })

    // Remove from available if present
    const availIdx = availableCitations.value.findIndex((c) => c.id === citation.id)
    if (availIdx !== -1) {
      availableCitations.value.splice(availIdx, 1)
    }

    return num
  }

  function setClickedCitationPos(pos) {
    clickedCitationPos.value = pos
  }

  function clearClickedCitationPos() {
    clickedCitationPos.value = null
  }

  return {
    availableCitations,
    usedCitations,
    nextReferenceNumber,
    insertCitation,
    clickedCitationPos,
    setClickedCitationPos,
    clearClickedCitationPos,
  }
}
