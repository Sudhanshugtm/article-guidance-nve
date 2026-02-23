<template>
  <div class="editor-page">
    <CdxToolbar />
    <div class="editor-wrapper" :class="{ 'rail-open': isRailOpen }">
      <div class="editor-main" @click="isRailOpen && (isRailOpen = false)">
        <TextEditor @open-outline="onOpenOutline" @open-settings="settingsDialogOpen = true" />
      </div>
      <div class="editor-rail-column">
        <EditorRail :is-open="isRailOpen" />
      </div>
    </div>
    <OutlinePopover
      v-if="outlineLocation === 'popover'"
      v-model:open="isPopoverOpen"
    />
    <SettingsDialog v-model:open="settingsDialogOpen" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import EditorToolbar from '@/components/EditorToolbar.vue'
import TextEditor from '@/components/TextEditor.vue'
import EditorRail from '@/components/EditorRail.vue'
import CdxToolbar from '@/components/CdxToolbar.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import OutlinePopover from '@/components/OutlinePopover.vue'
import { useEditorSettings } from '@/composables/useEditorSettings'

const { settings } = useEditorSettings()
const outlineLocation = computed(() => settings.value.outline.location)

const isRailOpen = ref(false)
const isPopoverOpen = ref(false)
const settingsDialogOpen = ref(false)

function onOpenOutline() {
  if (outlineLocation.value === 'popover') {
    isPopoverOpen.value = true
  } else {
    isRailOpen.value = true
  }
}

watch(outlineLocation, () => {
  isRailOpen.value = false
  isPopoverOpen.value = false
})
</script>

<style scoped>
.editor-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.editor-wrapper {
  display: flex;
  height: calc(100% - 48px);
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
