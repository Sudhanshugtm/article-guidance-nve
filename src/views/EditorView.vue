<template>
  <div class="editor-page">
    <CdxToolbar @cite="onOpenCiteDefault" />
    <div class="editor-wrapper" :class="{ 'rail-open': isRailOpen }">
      <div class="editor-main" @click="isRailOpen && (isRailOpen = false)">
        <TextEditor @open-outline="onOpenOutline" @open-settings="settingsDialogOpen = true" />
      </div>
      <div class="editor-rail-column">
        <EditorRail
          :is-open="isRailOpen"
          :initial-view="initialView"
          @content-inserted="onContentInserted"
          @close="isRailOpen = false"
          @open-cite-discover="onOpenCiteDiscover"
        />
      </div>
    </div>

    <!-- Force entry point: + button in the 44px rail strip, aligned with cursor -->
    <div
      v-if="isForceButtonVisible"
      class="force-entry-point"
      :style="forceButtonStyle"
      @mousedown.prevent
      @click.stop="onForceButtonClick"
    >
      <CdxIcon :icon="cdxIconAdd" />
    </div>

    <!-- Unified check rail indicator: single indicator with badge for multiple checks -->
    <div
      v-if="isUnifiedRailVisible"
      class="peacock-rail-indicator"
      :style="unifiedRailStyle"
      @mousedown.prevent
      @click.stop="onUnifiedRailClick"
    >
      <CdxIcon :icon="cdxIconAlert" />
      <span v-if="totalChecks > 1" class="rail-badge">{{ totalChecks }}</span>
    </div>

    <OutlinePopover
      v-if="outlineLocation === 'popover'"
      v-model:open="isPopoverOpen"
      :initial-view="initialView"
      @content-inserted="onContentInserted"
      @open-cite-discover="onOpenCiteDiscover"
    />
    <SettingsDialog v-model:open="settingsDialogOpen" />
    <CiteDialog v-model:open="citeDialogOpen" :initial-tab="citeDialogInitialTab" />
    <ReviseToneCard />
    <PastedContentCard />
    <CompleteSectionCard />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconAdd, cdxIconAlert } from '@wikimedia/codex-icons'
import TextEditor from '@/components/TextEditor.vue'
import EditorRail from '@/components/EditorRail.vue'
import CdxToolbar from '@/components/CdxToolbar.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import CiteDialog from '@/components/CiteDialog.vue'
import OutlinePopover from '@/components/OutlinePopover.vue'
import ReviseToneCard from '@/components/ReviseToneCard.vue'
import PastedContentCard from '@/components/PastedContentCard.vue'
import CompleteSectionCard from '@/components/CompleteSectionCard.vue'
import { useEditorSettings } from '@/composables/useEditorSettings'
import { useEditorInstance } from '@/composables/useEditorInstance'
import { useCursorRect } from '@/composables/useCursorRect'
import { usePlaceholderInteraction } from '@/composables/usePlaceholderInteraction'
import { usePeacockDetection } from '@/composables/usePeacockDetection'
import { useEditCheckPagination } from '@/composables/useEditCheckPagination'

const { settings } = useEditorSettings()
const outlineLocation = computed(() => settings.value.outline.location)
const outlinePersistence = computed(() => settings.value.outline.persistence)
const entryPointStyle = computed(() => settings.value.entryPoint.style)

// Force entry point
const { getEditor, hasContent, citationClickCount } = useEditorInstance()
const { activePlaceholderPos } = usePlaceholderInteraction()
const { cursorRect } = useCursorRect()
const { triggerDetectionOnInsert } = usePeacockDetection()
const { activeChecks, totalChecks, unifiedRailRect, showCheckAtIndex } =
  useEditCheckPagination()

// Unified check rail indicator
const isUnifiedRailVisible = computed(() => {
  if (isRailOpen.value || isPopoverOpen.value) return false
  return totalChecks.value > 0
})

const unifiedRailStyle = computed(() => {
  if (!unifiedRailRect.value) return {}
  const rect = unifiedRailRect.value
  return {
    position: 'fixed',
    top: `${rect.top}px`,
    right: '0px',
    width: '44px',
    height: `${rect.height}px`,
  }
})

const isCursorInAnyCheckParagraph = computed(() => {
  const editor = getEditor()
  if (!editor) return false
  const pos = editor.state.selection.from
  for (const check of activeChecks.value) {
    if (check.range && pos >= check.range.from && pos <= check.range.to) return true
  }
  return false
})

const isForceButtonVisible = computed(() => {
  if (!['inline', 'force', 'quiet', 'text', 'floating'].includes(entryPointStyle.value))
    return false
  if (isRailOpen.value || isPopoverOpen.value) return false
  if (!cursorRect.value) return false
  if (isUnifiedRailVisible.value && isCursorInAnyCheckParagraph.value) return false
  return cursorRect.value.visible
})

const forceButtonStyle = computed(() => {
  if (!cursorRect.value) return {}
  const rect = cursorRect.value
  const halfLeading = (rect.lineHeight - rect.glyphHeight) / 2
  return {
    position: 'fixed',
    top: `${rect.top - halfLeading}px`,
    right: '0px',
    width: '44px',
    height: `${rect.lineHeight}px`,
  }
})

const isRailOpen = ref(false)
const isPopoverOpen = ref(false)
const settingsDialogOpen = ref(false)
const citeDialogOpen = ref(false)
const citeDialogInitialTab = ref('automatic')
const initialView = ref(null)

function onForceButtonClick() {
  getEditor()?.commands.blur()
  onOpenOutline()
}

function onUnifiedRailClick() {
  const editor = getEditor()
  editor?.commands.blur()
  showCheckAtIndex(0, editor)
}

function onOpenOutline() {
  const editor = getEditor()
  const isPlaceholderSelected =
    editor?.state.selection.node?.type.name === 'placeholderChip' ||
    activePlaceholderPos.value !== null
  initialView.value = isPlaceholderSelected ? 'verified-facts' : null

  if (outlineLocation.value === 'popover') {
    isPopoverOpen.value = true
  } else {
    isRailOpen.value = true
  }
}

function onOpenCiteDefault() {
  citeDialogInitialTab.value = 'automatic'
  citeDialogOpen.value = true
}

function onOpenCiteDiscover() {
  citeDialogInitialTab.value = 'discover'
  citeDialogOpen.value = true
}

// Track whether the popover/rail should stay open after content insertion
const keepOpenAfterInsert = ref(false)

function onContentInserted() {
  hasContent.value = true
  if (outlinePersistence.value === 'close') {
    isRailOpen.value = false
    isPopoverOpen.value = false
  } else {
    // Set flag so the watcher can re-open the popover if focus-loss closes it
    keepOpenAfterInsert.value = true
  }

  // Check the previous paragraph for peacock words after rail insertion
  nextTick(() => {
    const editor = getEditor()
    if (editor) triggerDetectionOnInsert(editor)
  })
}

// When the popover closes due to focus moving to the editor after insertion,
// re-open it if the keep-open flag is set
watch(isPopoverOpen, (newVal) => {
  if (!newVal && keepOpenAfterInsert.value) {
    keepOpenAfterInsert.value = false
    isPopoverOpen.value = true
  }
})

watch(citationClickCount, () => {
  onOpenCiteDefault()
})

watch(outlineLocation, () => {
  isRailOpen.value = false
  isPopoverOpen.value = false
})
</script>

<style scoped>
.editor-page {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.editor-wrapper {
  display: flex;
  padding-top: 48px;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}

.editor-wrapper.rail-open {
  transform: translateX(calc(-100vw + 88px));
}

.editor-main {
  flex: 0 0 calc(100vw - 44px);
  display: flex;
  flex-direction: column;
}

.editor-rail-column {
  flex: 0 0 calc(100vw - 44px);
  display: flex;
  flex-direction: column;
}

.force-entry-point {
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 2px solid var(--border-color-interactive);
  box-sizing: border-box;
  cursor: pointer;
  z-index: 2;
}

.force-entry-point :deep(.cdx-icon) {
  color: var(--color-base);
}

.peacock-rail-indicator {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-left: 2px solid var(--color-warning);
  box-sizing: border-box;
  cursor: pointer;
  z-index: 2;
}

.peacock-rail-indicator :deep(.cdx-icon) {
  color: var(--color-warning);
}

.rail-badge {
  position: absolute;
  bottom: 0;
  right: 2px;
  min-width: 12px;
  min-height: 12px;
  padding: 1px 2px;
  background-color: var(--background-color-progressive, #36c);
  border: 1px solid var(--border-color-inverted, #fff);
  border-radius: var(--border-radius-base, 2px);
  color: var(--color-inverted, #fff);
  font-size: var(--font-size-x-small, 12px);
  font-weight: var(--font-weight-bold, 700);
  line-height: 12px;
  text-align: center;
}
</style>
