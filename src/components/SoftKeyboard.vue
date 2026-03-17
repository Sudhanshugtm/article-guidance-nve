<template>
  <Transition name="slide-up">
    <div v-show="isVisible" ref="wrapperRef" class="soft-keyboard-wrapper">
      <div ref="keyboardRef" class="soft-keyboard"></div>
      <div class="keyboard-bottom-bar">
        <img :src="emojiIcon" alt="" class="bottom-bar-icon emoji-icon" />
        <img :src="micIcon" alt="" class="bottom-bar-icon mic-icon" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import { useEditorInstance } from '../composables/useEditorInstance'
import emojiIcon from '../assets/keyboard-emoji.svg'
import micIcon from '../assets/keyboard-mic.svg'
import {
  applySoftKeyboardInputButton,
  getNextSoftKeyboardLayout,
} from '../utils/softKeyboardInput.js'

const emit = defineEmits(['height-change'])

const wrapperRef = ref(null)
const keyboardRef = ref(null)
const editorFocused = ref(false)
const externalInputFocused = ref(false)
const isVisible = computed(() => editorFocused.value || externalInputFocused.value)
const layoutName = ref('default')
let keyboardInstance = null

const { editorInstance } = useEditorInstance()

const EXTERNAL_INPUT_SELECTOR =
  '.cite-dialog__reuse-search input, .cite-dialog__discover-search input'

function getFocusedExternalInput() {
  const activeElement = document.activeElement
  if (
    activeElement instanceof HTMLInputElement &&
    activeElement.matches(EXTERNAL_INPUT_SELECTOR)
  ) {
    return activeElement
  }
  return null
}

function setKeyboardLayout(nextLayout) {
  layoutName.value = nextLayout
  keyboardInstance?.setOptions({ layoutName: nextLayout })
}

function applyButtonToExternalInput(input, button) {
  const nextState = applySoftKeyboardInputButton(
    {
      value: input.value,
      selectionStart: input.selectionStart ?? input.value.length,
      selectionEnd: input.selectionEnd ?? input.value.length,
    },
    button,
  )

  input.value = nextState.value
  input.setSelectionRange(nextState.selectionStart, nextState.selectionEnd)
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

function applyButtonToEditor(button) {
  const editor = editorInstance.value
  if (!editor) return

  if (button === '{shift}' || button === '{numbers}') {
    return
  }

  if (button === '{backspace}') {
    editor
      .chain()
      .focus()
      .command(({ state, tr }) => {
        const { from, to, empty } = state.selection
        if (!empty) {
          tr.delete(from, to)
          return true
        }
        if (from === 0) {
          return true
        }
        tr.delete(from - 1, from)
        return true
      })
      .run()
    return
  }

  if (button === '{enter}') {
    editor.chain().focus().splitBlock().run()
    return
  }

  const text = button === '{space}' ? ' ' : button
  if (!text || text.startsWith('{')) return

  editor
    .chain()
    .focus()
    .command(({ state, tr }) => {
      const { from, to } = state.selection
      tr.insertText(text, from, to)
      return true
    })
    .run()
}

function handleSoftKeyboardPress(button) {
  const input = getFocusedExternalInput()
  if (input) {
    applyButtonToExternalInput(input, button)
  } else {
    applyButtonToEditor(button)
  }

  const nextLayout = getNextSoftKeyboardLayout(layoutName.value, button)
  if (nextLayout !== layoutName.value) {
    setKeyboardLayout(nextLayout)
  }
}

function onDocumentFocusIn(e) {
  if (e.target.matches(EXTERNAL_INPUT_SELECTOR)) {
    externalInputFocused.value = true
  }
}

function onDocumentFocusOut(e) {
  if (!e.relatedTarget || !e.relatedTarget.matches(EXTERNAL_INPUT_SELECTOR)) {
    externalInputFocused.value = false
  }
}

watch(isVisible, async (visible) => {
  if (visible) {
    await nextTick()
    const height = wrapperRef.value?.offsetHeight || 0
    emit('height-change', height)
  } else {
    emit('height-change', 0)
  }
})

const layout = {
  default: [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    '{shift} z x c v b n m {backspace}',
    '{numbers} {space} {enter}',
  ],
  shift: [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    '{shift} Z X C V B N M {backspace}',
    '{numbers} {space} {enter}',
  ],
}

const display = {
  '{shift}': '⇧',
  '{backspace}': '⌫',
  '{space}': ' ',
  '{numbers}': '123',
  '{enter}': 'return',
}

onMounted(() => {
  keyboardInstance = new Keyboard(keyboardRef.value, {
    layout,
    layoutName: layoutName.value,
    display,
    theme: 'hg-theme-default ios-theme',
    physicalKeyboardHighlight: true,
    physicalKeyboardHighlightPress: true,
    physicalKeyboardHighlightBgColor: '#e7e6ed',
    physicalKeyboardHighlightTextColor: '#595959',
    mergeDisplay: true,
    preventMouseDownDefault: true,
    onKeyPress: handleSoftKeyboardPress,
  })

  setupFocusListeners()

  document.addEventListener('focusin', onDocumentFocusIn)
  document.addEventListener('focusout', onDocumentFocusOut)
})

function setupFocusListeners() {
  const editor = editorInstance.value
  if (!editor) return

  editor.on('focus', () => {
    editorFocused.value = true
  })
  editor.on('blur', () => {
    editorFocused.value = false
  })

  // Also sync on selection updates, in case focus fired before listeners were attached
  editor.on('selectionUpdate', () => {
    if (editor.isFocused && !editorFocused.value) {
      editorFocused.value = true
    }
  })

  if (editor.isFocused) {
    editorFocused.value = true
  }
}

watch(editorInstance, (newEditor) => {
  if (newEditor) {
    setupFocusListeners()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('focusin', onDocumentFocusIn)
  document.removeEventListener('focusout', onDocumentFocusOut)
  keyboardInstance?.destroy()
  keyboardInstance = null
})
</script>

<style scoped>
.soft-keyboard-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 450;
  background-color: #e6e9ed;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .soft-keyboard-wrapper {
    left: var(--editor-shell-offset);
    width: var(--editor-shell-width);
    bottom: 16px;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    overflow: hidden;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

/* simple-keyboard container */
.soft-keyboard-wrapper :deep(.hg-theme-default) {
  background-color: transparent;
  border: none;
  padding: 12px 8.5px 10px;
}

.soft-keyboard-wrapper :deep(.hg-theme-default .hg-row .hg-button-container),
.soft-keyboard-wrapper :deep(.hg-theme-default .hg-row .hg-button:not(:last-child)) {
  margin-right: 0;
}

/* Rows */
.soft-keyboard-wrapper :deep(.hg-row) {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 0;
}

.soft-keyboard-wrapper :deep(.hg-row:not(:last-child)) {
  margin-bottom: 11px;
}

/* Row 2: indented like iOS */
.soft-keyboard-wrapper :deep(.hg-row:nth-child(2)) {
  padding: 0 20px;
}

/* Shift key: extra right margin to create wider gap with letter keys */
.soft-keyboard-wrapper :deep(.hg-theme-default .hg-row .hg-button[data-skbtn='{shift}']) {
  flex: 0 0 45px;
  font-size: 23px;
  margin-right: 8.25px;
}

/* Backspace key */
.soft-keyboard-wrapper :deep(.hg-button[data-skbtn='{backspace}']) {
  flex: 0 0 45px;
  font-size: 23px;
  margin-left: 8.25px;
}

/* All keys: base style */
.soft-keyboard-wrapper :deep(.hg-button) {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8.5px;
  border: none;
  box-shadow: none;
  color: #595959;
  font-family: -apple-system, 'SF Pro', 'Helvetica Neue', sans-serif;
  font-size: 25px;
  font-weight: 400;
  height: 45px;
  min-width: 0;
  margin: 0;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* Space key */
.soft-keyboard-wrapper :deep(.hg-button[data-skbtn='{space}']) {
  flex-grow: 1;
}

/* 123 key */
.soft-keyboard-wrapper :deep(.hg-button[data-skbtn='{numbers}']) {
  flex: 0 0 92px;
  font-family: -apple-system, 'SF Compact Rounded', 'Helvetica Neue', sans-serif;
  font-size: 18px;
}

/* Return key */
.soft-keyboard-wrapper :deep(.hg-button[data-skbtn='{enter}']) {
  flex: 0 0 92px;
  font-size: 19px;
}

/* Highlight on physical key press */
.soft-keyboard-wrapper :deep(.hg-activeButton) {
  background-color: #e6e9ed !important;
}

/* Bottom bar with emoji and mic */
.keyboard-bottom-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 39px 15px 36px;
  height: 70px;
  box-sizing: border-box;
}

.bottom-bar-icon {
  opacity: 0.63;
}

.emoji-icon {
  width: 27px;
  height: 27px;
}

.mic-icon {
  width: 19px;
  height: 28px;
}
</style>
