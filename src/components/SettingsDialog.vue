<template>
  <CdxDialog v-model:open="open" title="Settings" :use-close-button="true">
    <div class="settings-content" :class="{ 'no-transitions': suppressTransitions }">
      <!-- Entry point section -->
      <div class="field-group">
        <CdxLabel>Entry point</CdxLabel>
        <CdxRadio
          v-for="(label, styleKey) in entryPointLabels"
          :key="styleKey"
          v-model="localSettings.entryPoint.style"
          :input-value="styleKey"
          name="entryPoint-style"
          @update:model-value="onSettingChange"
        >
          {{ label }}
        </CdxRadio>
      </div>
      <!-- Outline location section -->
      <div class="field-group">
        <CdxLabel>Outline location</CdxLabel>
        <CdxRadio
          v-for="(label, locationKey) in outlineLocationLabels"
          :key="locationKey"
          v-model="localSettings.outline.location"
          :input-value="locationKey"
          name="outline-location"
          @update:model-value="onSettingChange"
        >
          {{ label }}
        </CdxRadio>
      </div>
    </div>
  </CdxDialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { CdxDialog, CdxLabel, CdxRadio } from '@wikimedia/codex'
import { useEditorSettings } from '../composables/useEditorSettings'
import { entryPointLabels, outlineLocationLabels } from '../config/editorSettings'

const open = defineModel('open', { type: Boolean, default: false })

// Suppress CSS transitions on mount so radios don't animate to their initial state
const suppressTransitions = ref(true)
onMounted(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      suppressTransitions.value = false
    })
  })
})

const { settings, updateSettings } = useEditorSettings()

// Local copy of settings for reactive updates
const localSettings = ref(structuredClone(settings.value))

// Watch for external URL changes and sync local settings
watch(
  settings,
  (newSettings) => {
    localSettings.value = structuredClone(newSettings)
  },
  { deep: true },
)

function onSettingChange() {
  updateSettings(localSettings.value)
}
</script>

<style scoped>
.field-group {
  margin-top: var(--spacing-75);
}

.field-group :deep(.cdx-label) {
  font-weight: var(--font-weight-bold);
}

.no-transitions :deep(*) {
  transition: none !important;
}
</style>
