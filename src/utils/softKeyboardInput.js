// ABOUTME: Shared soft-keyboard helpers for text insertion and layout switching.
// ABOUTME: Keeps button semantics testable outside the keyboard component.

function getReplacementText(button) {
  if (button === '{space}') return ' '
  if (button === '{enter}') return '\n'
  if (button.startsWith('{')) return null
  return button
}

export function applySoftKeyboardInputButton(state, button) {
  const { value, selectionStart, selectionEnd } = state

  if (button === '{backspace}') {
    if (selectionStart !== selectionEnd) {
      const nextValue = value.slice(0, selectionStart) + value.slice(selectionEnd)
      return {
        value: nextValue,
        selectionStart,
        selectionEnd: selectionStart,
      }
    }

    if (selectionStart === 0) {
      return { value, selectionStart, selectionEnd }
    }

    const nextValue = value.slice(0, selectionStart - 1) + value.slice(selectionEnd)
    const nextSelection = selectionStart - 1
    return {
      value: nextValue,
      selectionStart: nextSelection,
      selectionEnd: nextSelection,
    }
  }

  const replacementText = getReplacementText(button)
  if (replacementText === null) {
    return { value, selectionStart, selectionEnd }
  }

  const nextValue = value.slice(0, selectionStart) + replacementText + value.slice(selectionEnd)
  const nextSelection = selectionStart + replacementText.length
  return {
    value: nextValue,
    selectionStart: nextSelection,
    selectionEnd: nextSelection,
  }
}

export function getNextSoftKeyboardLayout(currentLayout, button) {
  if (button === '{shift}') {
    return currentLayout === 'shift' ? 'default' : 'shift'
  }

  if (currentLayout === 'shift' && !button.startsWith('{')) {
    return 'default'
  }

  return currentLayout
}

