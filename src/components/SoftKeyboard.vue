<template>
  <Transition name="slide-up">
    <div v-show="isVisible" class="soft-keyboard-wrapper">
      <div ref="keyboardRef" class="soft-keyboard"></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import { useEditorInstance } from '../composables/useEditorInstance'

const keyboardRef = ref(null)
const isVisible = ref(false)
let keyboardInstance = null

const { editorInstance } = useEditorInstance()

const layout = {
  default: [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    '{shift} z x c v b n m {backspace}',
    '{space}',
  ],
  shift: [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    '{shift} Z X C V B N M {backspace}',
    '{space}',
  ],
}

const display = {
  '{shift}': '⇧',
  '{backspace}': '⌫',
  '{space}': ' ',
}

onMounted(() => {
  keyboardInstance = new Keyboard(keyboardRef.value, {
    layout,
    display,
    theme: 'hg-theme-default ios-theme',
    physicalKeyboardHighlight: true,
    physicalKeyboardHighlightPress: true,
    physicalKeyboardHighlightBgColor: '#b0d4f1',
    physicalKeyboardHighlightTextColor: '#000',
    mergeDisplay: true,
    preventMouseDownDefault: true,
    onChange: () => {},
    onKeyPress: () => {},
  })

  setupFocusListeners()
})

function setupFocusListeners() {
  const editor = editorInstance.value
  if (!editor) return

  editor.on('focus', () => {
    isVisible.value = true
  })
  editor.on('blur', () => {
    isVisible.value = false
  })

  // Also sync on selection updates, in case focus fired before listeners were attached
  editor.on('selectionUpdate', () => {
    if (editor.isFocused && !isVisible.value) {
      isVisible.value = true
    }
  })

  if (editor.isFocused) {
    isVisible.value = true
  }
}

watch(editorInstance, (newEditor) => {
  if (newEditor) {
    setupFocusListeners()
  }
})

onBeforeUnmount(() => {
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
  z-index: 100;
  background-color: #d1d4d9;
  padding: 4px 2px 20px 2px;
  box-sizing: border-box;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

/* iOS-style overrides for simple-keyboard */
.soft-keyboard-wrapper :deep(.hg-theme-default) {
  background-color: transparent;
  border: none;
  padding: 0;
}

.soft-keyboard-wrapper :deep(.hg-row) {
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
}

.soft-keyboard-wrapper :deep(.hg-button) {
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 22px;
  font-weight: 400;
  height: 42px;
  min-width: 32px;
  margin: 0 3px;
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.soft-keyboard-wrapper :deep(.hg-button[data-skbtn="{space}"]) {
  flex-grow: 1;
  min-width: 180px;
  background-color: #fff;
}

.soft-keyboard-wrapper :deep(.hg-button[data-skbtn="{shift}"]),
.soft-keyboard-wrapper :deep(.hg-button[data-skbtn="{backspace}"]) {
  background-color: #adb0b8;
  min-width: 42px;
  font-size: 18px;
}

.soft-keyboard-wrapper :deep(.hg-activeButton) {
  background-color: #b0d4f1 !important;
}
</style>
