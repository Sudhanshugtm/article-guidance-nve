<template>
  <div ref="anchorRef" class="outline-popover-anchor"></div>
  <CdxPopover
    v-model:open="open"
    :anchor="anchorRef"
    title="Outline"
    :use-close-button="true"
    close-button-label="Close"
    placement="top-start"
    :render-in-place="true"
  >
    <div class="outline-popover-body">
      <OutlineAccordionList />
    </div>
  </CdxPopover>
</template>

<script setup>
import { ref } from 'vue'
import { CdxPopover } from '@wikimedia/codex'
import OutlineAccordionList from './OutlineAccordionList.vue'

const open = defineModel('open', { type: Boolean, default: false })
const anchorRef = ref(null)
</script>

<style scoped>
.outline-popover-anchor {
  width: 0;
  height: 0;
}

.outline-popover-body {
  max-height: 50vh;
  overflow-y: auto;
}

.outline-popover-anchor + :deep(.cdx-popover) {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  top: auto !important;
  width: 100% !important;
  max-width: 100% !important;
  transform: none !important;
  border-radius: 0 !important;
  border: none !important;
  border-top: 1px solid var(--border-color-base, #a2a9b1) !important;
}

.outline-popover-body :deep(.cdx-accordion__content) {
  font-family: var(--font-family-system-sans);
}
</style>
