import { ref } from 'vue'
import { articleSections } from '../config/articleSections.js'

const accordionStates = ref(
  Object.fromEntries(articleSections.map((_, index) => [index, index === 0])),
)

export function useAccordionState() {
  function updateAccordionState(index, newValue) {
    accordionStates.value[index] = newValue
  }

  return { accordionStates, updateAccordionState }
}
