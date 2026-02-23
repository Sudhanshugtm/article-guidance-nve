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
    <div
      v-show="isButtonVisible"
      ref="floatingElRef"
      class="codex-floating-entry"
      :style="floatingButtonStyle"
      @mousedown.prevent
      @click.stop="onCodexButtonClick"
      @mouseenter="pauseAnimation"
      @mouseleave="resumeAnimation"
    >
      <!-- Style 1: Icon button (default) -->
      <CdxButton
        v-if="entryPointStyle === 'icon'"
        class="codex-floating-btn"
        aria-label="Add content"
      >
        <CdxIcon :icon="cdxIconAdd" />
      </CdxButton>

      <!-- Style 2: Quiet button with cycling label (before interaction) -->
      <CdxButton
        v-else-if="entryPointStyle === 'quiet' && isCycling"
        weight="quiet"
        class="codex-floating-btn-quiet"
        aria-label="Add content"
      >
        <CdxIcon :icon="cdxIconAdd" />
        <span class="typewriter-container">
          <span
            class="typewriter-text"
            :class="{ 'typewriter-mask': animPhase === 'wiping' }"
            :style="animPhase === 'wiping' ? { '--wipe': wipeMaskPercent + '%' } : {}"
            >{{ displayText }}</span
          >
        </span>
      </CdxButton>

      <!-- Style 2 fallback: quiet icon-only after interaction -->
      <CdxButton
        v-else-if="entryPointStyle === 'quiet'"
        weight="quiet"
        class="codex-floating-btn"
        aria-label="Add content"
      >
        <CdxIcon :icon="cdxIconAdd" />
      </CdxButton>

      <!-- Style 3: Plain text -->
      <span v-else class="codex-floating-text"> Tap here to continue... </span>
    </div>
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { CdxButton, CdxIcon } from '@wikimedia/codex'
import { cdxIconAdd, cdxIconSettings } from '@wikimedia/codex-icons'
import { useEditorSettings } from '../composables/useEditorSettings'
import { defaultSettings } from '../config/editorSettings'
import { articleSections } from '../config/articleSections'

const emit = defineEmits(['open-rail', 'open-settings'])

const { settings } = useEditorSettings()

const entryPointStyle = computed(
  () => settings.value.entryPoint.style || defaultSettings.entryPoint.style,
)

// Typewriter animation for the quiet button style
const sectionTitles = articleSections.map((s) => s.title)
const currentLabelIndex = ref(0)
const displayText = ref('')
const wipeProgress = ref(0)
const isCycling = ref(true)
const animPhase = ref('typing') // 'typing' | 'holding' | 'wiping'

let charTimer = null
let holdTimer = null
let charIndex = 0
let wipeLen = 0
let wipeTicks = 0
let cyclingStarted = false
let isPaused = false
let holdStartTime = 0
let holdRemainingMs = 0

const CHAR_INTERVAL_MS = 50
const HOLD_DURATION_MS = 3000

// Mask goes from -15% (all visible) to 100% (all hidden)
const wipeMaskPercent = computed(() => -15 + wipeProgress.value * 115)

function typewriterTick() {
  if (animPhase.value === 'typing') {
    const title = sectionTitles[currentLabelIndex.value]
    displayText.value += title[charIndex]
    charIndex++
    if (charIndex >= title.length) {
      clearInterval(charTimer)
      charTimer = null
      animPhase.value = 'holding'
      if (isPaused) return
      holdStartTime = Date.now()
      holdTimer = setTimeout(startWipe, HOLD_DURATION_MS)
    }
  } else if (animPhase.value === 'wiping') {
    wipeTicks++
    wipeProgress.value = wipeTicks / wipeLen
    if (wipeTicks >= wipeLen) {
      clearInterval(charTimer)
      charTimer = null
      // Advance to next label and start typing
      displayText.value = ''
      currentLabelIndex.value = (currentLabelIndex.value + 1) % sectionTitles.length
      charIndex = 0
      animPhase.value = 'typing'
      charTimer = setInterval(typewriterTick, CHAR_INTERVAL_MS)
      // If paused, let the next label type out fully, then it will
      // hit the typing→holding boundary and stop there
    }
  }
}

function startWipe() {
  holdTimer = null
  wipeLen = displayText.value.length
  wipeTicks = 0
  wipeProgress.value = 0
  animPhase.value = 'wiping'
  charTimer = setInterval(typewriterTick, CHAR_INTERVAL_MS)
}

function startCycling() {
  if (charTimer) return
  animPhase.value = 'typing'
  charIndex = 0
  displayText.value = ''
  charTimer = setInterval(typewriterTick, CHAR_INTERVAL_MS)
}

function stopCycling() {
  if (!isCycling.value) return
  isCycling.value = false
  clearInterval(charTimer)
  clearTimeout(holdTimer)
  charTimer = null
  holdTimer = null
  displayText.value = ''
}

function pauseAnimation() {
  if (!isCycling.value) return
  isPaused = true

  if (animPhase.value === 'holding') {
    // Pause the hold timer, save remaining time
    clearTimeout(holdTimer)
    holdTimer = null
    holdRemainingMs = Math.max(0, HOLD_DURATION_MS - (Date.now() - holdStartTime))
  }
  // typing and wiping: let the current phase run to completion,
  // isPaused flag is checked at the transition boundary
}

function resumeAnimation() {
  if (!isCycling.value || !isPaused) return
  isPaused = false

  if (animPhase.value === 'holding') {
    // Resume the hold timeout with remaining time
    holdStartTime = Date.now()
    holdTimer = setTimeout(startWipe, holdRemainingMs)
  }
  // typing/wiping: interval is still running (they run to completion),
  // and the next transition will proceed normally since isPaused is now false
}

const editorRef = ref(null)
const floatingElRef = ref(null)
const isButtonVisible = ref(false)
const buttonTop = ref(0)
const buttonLeft = ref(0)

let typingTimer = null
const TYPING_DEBOUNCE_MS = 500
const BUTTON_GAP = 4
const ENTRY_POINT_HEIGHT = 32
const ENTRY_POINT_WIDTHS = { icon: 32, quiet: 220, text: 180 }

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

  const quietWidth = isCycling.value ? ENTRY_POINT_WIDTHS.quiet : ENTRY_POINT_WIDTHS.icon
  const currentWidth =
    entryPointStyle.value === 'quiet' ? quietWidth : ENTRY_POINT_WIDTHS[entryPointStyle.value] || 32

  // Hide if button would extend below visible editor area
  if (top + ENTRY_POINT_HEIGHT > editorRef.value.clientHeight) {
    isButtonVisible.value = false
    return
  }

  // Right-edge flip: if entry point overflows right, align right edge to cursor
  if (left + currentWidth > editorRef.value.clientWidth) {
    left = caretRect.left - editorRect.left - currentWidth
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
  stopCycling()
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
  if (event.relatedTarget && event.relatedTarget.closest('.codex-floating-entry')) {
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
  stopCycling()
  emit('open-rail')
}

// Start typewriter on first button appearance (not on mount)
watch(isButtonVisible, (visible) => {
  if (visible && !cyclingStarted && isCycling.value) {
    cyclingStarted = true
    startCycling()
  }
})

onMounted(() => {
  document.addEventListener('selectionchange', onSelectionChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', onSelectionChange)
  clearTimeout(typingTimer)
  clearInterval(charTimer)
  clearTimeout(holdTimer)
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

.codex-floating-entry {
  position: absolute;
  z-index: 1;
}

.codex-floating-btn {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  padding: 5px !important;
}

.codex-floating-btn-quiet {
  white-space: nowrap;
}

.typewriter-container {
  display: inline-block;
}

.typewriter-text {
  white-space: pre;
}

.typewriter-mask {
  --wipe: -15%;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    transparent var(--wipe),
    black calc(var(--wipe) + 15%),
    black 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    transparent var(--wipe),
    black calc(var(--wipe) + 15%),
    black 100%
  );
}

.codex-floating-text {
  white-space: nowrap;
  color: var(--color-subtle);
  cursor: pointer;
}
</style>
