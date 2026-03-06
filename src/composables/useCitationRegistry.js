import { ref, computed } from 'vue'
import { citations as preExistingCitations } from '@/config/citations'

const allCitations = ref([...preExistingCitations])

export function useCitationRegistry() {
  const nextReferenceNumber = computed(() => allCitations.value.length + 1)

  function addCitation(citation) {
    allCitations.value.push(citation)
  }

  return {
    allCitations,
    nextReferenceNumber,
    addCitation,
  }
}
