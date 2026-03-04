import { ref, shallowRef } from 'vue'

const placeholderClickEvent = shallowRef(null)
const activePlaceholderPos = ref(null)
const activePlaceholderSettled = ref(false)

export function usePlaceholderInteraction() {
  function signalPlaceholderClicked(label) {
    placeholderClickEvent.value = { label, timestamp: Date.now() }
  }

  function clearPlaceholderClick() {
    placeholderClickEvent.value = null
  }

  function setActivePlaceholder(pos) {
    activePlaceholderPos.value = pos
    activePlaceholderSettled.value = false
  }

  function markActivePlaceholderSettled() {
    activePlaceholderSettled.value = true
  }

  function clearActivePlaceholder() {
    activePlaceholderPos.value = null
    activePlaceholderSettled.value = false
  }

  return {
    placeholderClickEvent,
    signalPlaceholderClicked,
    clearPlaceholderClick,
    activePlaceholderPos,
    activePlaceholderSettled,
    setActivePlaceholder,
    markActivePlaceholderSettled,
    clearActivePlaceholder,
  }
}
