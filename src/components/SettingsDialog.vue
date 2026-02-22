<template>
  <CdxDialog v-model:open="open" title="Settings" :use-close-button="true">
    <div class="settings-content" :class="{ 'no-transitions': suppressTransitions }">
      <!-- Entry point section -->
      <div class="field-group">
        <CdxLabel>Entry point</CdxLabel>
        <CdxCheckbox
          v-for="(label, iconKey) in entryPointLabels"
          :key="iconKey"
          :checkbox-id="`entryPoint-${iconKey}`"
          :model-value="localSettings.entryPoint.icon === iconKey"
          @update:model-value="() => updateEntryPointIcon(iconKey)"
        >
          {{ label }}
        </CdxCheckbox>
      </div>
    </div>
  </CdxDialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { CdxDialog, CdxLabel, CdxCheckbox } from '@wikimedia/codex'
import { useEditorSettings } from '../composables/useEditorSettings'
import { entryPointLabels } from '../config/editorSettings'

const open = defineModel('open', { type: Boolean, default: false })

// Suppress CSS transitions on mount so checkboxes don't animate to their initial state
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

function updateEntryPointIcon(iconKey) {
  localSettings.value.entryPoint.icon = iconKey
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
