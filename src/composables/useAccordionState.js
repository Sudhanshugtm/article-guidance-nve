import { ref } from 'vue'
import { articleSections } from '../config/articleSections.js'

const accordionStates = ref(
  Object.fromEntries(articleSections.map((_, index) => [index, index === 0])),
)

export function useAccordionState() {
  function updateAccordionState(index, newValue) {
    accordionStates.value[index] = newValue
  }

  /**
   * Reset accordion states for a different number of sections.
   * First section open, rest closed.
   */
  function resetForSections(sections) {
    accordionStates.value = Object.fromEntries(
      sections.map((_, index) => [index, index === 0]),
    )
  }

  return { accordionStates, updateAccordionState, resetForSections }
}
