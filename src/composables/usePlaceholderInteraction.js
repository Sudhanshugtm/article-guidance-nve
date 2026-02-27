import { shallowRef } from 'vue'

const placeholderClickEvent = shallowRef(null)

export function usePlaceholderInteraction() {
  function signalPlaceholderClicked(label) {
    placeholderClickEvent.value = { label, timestamp: Date.now() }
  }

  function clearPlaceholderClick() {
    placeholderClickEvent.value = null
  }

  return { placeholderClickEvent, signalPlaceholderClicked, clearPlaceholderClick }
}
