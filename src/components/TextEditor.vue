<template>
  <div class="text-editor-wrapper">
    <div
      ref="editorRef"
      class="text-editor"
      contenteditable="true"
      @input="onInput"
      @keydown="onKeydown"
      @keyup="onKeyup"
      @mouseup="onCursorChange"
      @focus="onFocus"
      @blur="onBlur"
      @scroll="onScroll"
    ></div>
    <CdxButton
      v-show="isButtonVisible"
      class="codex-floating-btn"
      aria-label="Add content"
      :style="floatingButtonStyle"
      @mousedown.prevent="onCodexButtonClick"
      @click.stop
    >
      <CdxIcon :icon="activeIcon" />
    </CdxButton>
    <CdxButton
      weight="quiet"
      class="settings-btn"
      aria-label="Settings"
      @click="$emit('open-settings')"
    >
      <CdxIcon :icon="cdxIconSettings" />
    </CdxButton>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { CdxButton, CdxIcon } from '@wikimedia/codex'
import { cdxIconSettings } from '@wikimedia/codex-icons'
import { useEditorSettings } from '../composables/useEditorSettings'
import { entryPointIcons, defaultSettings } from '../config/editorSettings'

const emit = defineEmits(['open-rail', 'open-settings'])

const { settings } = useEditorSettings()

const activeIcon = computed(
  () =>
    entryPointIcons[settings.value.entryPoint.icon] ||
    entryPointIcons[defaultSettings.entryPoint.icon],
)
const editorRef = ref(null)
const isButtonVisible = ref(false)
const buttonTop = ref(0)
const buttonLeft = ref(0)

let typingTimer = null
const TYPING_DEBOUNCE_MS = 500
const BUTTON_GAP = 4
const BUTTON_SIZE = 32

const floatingButtonStyle = computed(() => ({
  position: 'absolute',
  top: `${buttonTop.value}px`,
  left: `${buttonLeft.value}px`,
  zIndex: 1,
}))

function updateButtonPosition() {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || !selection.getRangeAt(0).collapsed) {
    isButtonVisible.value = false
    return
  }

  const range = selection.getRangeAt(0)

  if (!editorRef.value || !editorRef.value.contains(range.commonAncestorContainer)) {
    isButtonVisible.value = false
    return
  }

  const editorRect = editorRef.value.getBoundingClientRect()
  let caretRect = range.getBoundingClientRect()

  // Empty editor or empty line: getBoundingClientRect returns a zero-height rect.
  // Calculate position from the editor's padding instead of modifying the DOM,
  // which would disrupt the browser's native caret rendering.
  if (caretRect.height === 0) {
    const computedStyle = window.getComputedStyle(editorRef.value)
    const paddingTop = parseFloat(computedStyle.paddingTop)
    const paddingLeft = parseFloat(computedStyle.paddingLeft)
    const lineHeight =
      parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.5
    caretRect = {
      top: editorRect.top + paddingTop,
      bottom: editorRect.top + paddingTop + lineHeight,
      left: editorRect.left + paddingLeft,
      right: editorRect.left + paddingLeft,
      height: lineHeight,
      width: 0,
    }
  }

  // Hide if caret is scrolled out of the visible editor area
  if (caretRect.bottom < editorRect.top || caretRect.top > editorRect.bottom) {
    isButtonVisible.value = false
    return
  }

  // Convert viewport coords to wrapper-relative coords (wrapper matches editor position)
  let top = caretRect.bottom - editorRect.top + BUTTON_GAP
  let left = caretRect.left - editorRect.left

  // Hide if button would extend below visible editor area
  if (top + BUTTON_SIZE > editorRef.value.clientHeight) {
    isButtonVisible.value = false
    return
  }

  // Right-edge flip: if button overflows right, align top-right corner to cursor
  if (left + BUTTON_SIZE > editorRef.value.clientWidth) {
    left = caretRect.left - editorRect.left - BUTTON_SIZE
  }

  left = Math.max(0, left)

  buttonTop.value = top
  buttonLeft.value = left
  isButtonVisible.value = true
}

function hideButton() {
  isButtonVisible.value = false
  clearTimeout(typingTimer)
  typingTimer = null
}

function scheduleShowButton() {
  clearTimeout(typingTimer)
  typingTimer = setTimeout(() => {
    typingTimer = null
    updateButtonPosition()
  }, TYPING_DEBOUNCE_MS)
}

function onInput() {
  hideButton()
  scheduleShowButton()
}

function onKeydown(event) {
  const modifierKeys = ['Shift', 'Control', 'Alt', 'Meta']
  if (!modifierKeys.includes(event.key)) {
    hideButton()
    scheduleShowButton()
  }
}

function onKeyup(event) {
  const navigationKeys = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'PageUp',
    'PageDown',
  ]
  if (navigationKeys.includes(event.key)) {
    updateButtonPosition()
  }
}

function onCursorChange() {
  updateButtonPosition()
}

function onFocus() {
  setTimeout(() => {
    updateButtonPosition()
  }, 0)
}

function onBlur(event) {
  if (event.relatedTarget && event.relatedTarget.closest('.codex-floating-btn')) {
    return
  }
  hideButton()
}

function onScroll() {
  if (isButtonVisible.value) {
    updateButtonPosition()
  }
}

function onSelectionChange() {
  const selection = window.getSelection()
  if (
    selection &&
    selection.rangeCount > 0 &&
    editorRef.value &&
    editorRef.value.contains(selection.getRangeAt(0).commonAncestorContainer)
  ) {
    if (!typingTimer) {
      updateButtonPosition()
    }
  }
}

function onCodexButtonClick() {
  emit('open-rail')
}

onMounted(() => {
  document.addEventListener('selectionchange', onSelectionChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', onSelectionChange)
  clearTimeout(typingTimer)
})
</script>

<style scoped>
.text-editor-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.text-editor {
  flex: 1;
  padding: var(--spacing-100);
  background-color: var(--background-color-base);
  outline: none;
  overflow-y: auto;
}

.settings-btn {
  position: absolute;
  bottom: var(--spacing-75);
  left: var(--spacing-75);
  z-index: 1;
  opacity: 0.1;
}

.codex-floating-btn {
  position: absolute;
  z-index: 1;
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  padding: 5px !important;
}
</style>
