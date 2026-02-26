<template>
  <div class="editor-page">
    <CdxToolbar @cite="citeDialogOpen = true" />
    <div class="editor-wrapper" :class="{ 'rail-open': isRailOpen }">
      <div class="editor-main" @click="isRailOpen && (isRailOpen = false)">
        <TextEditor @open-outline="onOpenOutline" @open-settings="settingsDialogOpen = true" />
      </div>
      <div class="editor-rail-column">
        <EditorRail :is-open="isRailOpen" @content-inserted="onContentInserted" />
      </div>
    </div>
    <OutlinePopover v-if="outlineLocation === 'popover'" v-model:open="isPopoverOpen" @content-inserted="onContentInserted" />
    <SettingsDialog v-model:open="settingsDialogOpen" />
    <CiteDialog v-model:open="citeDialogOpen" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import TextEditor from '@/components/TextEditor.vue'
import EditorRail from '@/components/EditorRail.vue'
import CdxToolbar from '@/components/CdxToolbar.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import CiteDialog from '@/components/CiteDialog.vue'
import OutlinePopover from '@/components/OutlinePopover.vue'
import { useEditorSettings } from '@/composables/useEditorSettings'

const { settings } = useEditorSettings()
const outlineLocation = computed(() => settings.value.outline.location)
const outlinePersistence = computed(() => settings.value.outline.persistence)

const isRailOpen = ref(false)
const isPopoverOpen = ref(false)
const settingsDialogOpen = ref(false)
const citeDialogOpen = ref(false)

function onOpenOutline() {
  if (outlineLocation.value === 'popover') {
    isPopoverOpen.value = true
  } else {
    isRailOpen.value = true
  }
}

// Track whether the popover/rail should stay open after content insertion
const keepOpenAfterInsert = ref(false)

function onContentInserted() {
  if (outlinePersistence.value === 'close') {
    isRailOpen.value = false
    isPopoverOpen.value = false
  } else {
    // Set flag so the watcher can re-open the popover if focus-loss closes it
    keepOpenAfterInsert.value = true
  }
}

// When the popover closes due to focus moving to the editor after insertion,
// re-open it if the keep-open flag is set
watch(isPopoverOpen, (newVal) => {
  if (!newVal && keepOpenAfterInsert.value) {
    keepOpenAfterInsert.value = false
    isPopoverOpen.value = true
  }
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
</style>
