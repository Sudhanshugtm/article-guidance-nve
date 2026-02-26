<template>
  <div ref="anchorRef" class="outline-popover-anchor"></div>
  <CdxPopover v-model:open="open" :anchor="anchorRef" placement="top-start" :render-in-place="true">
    <div class="outline-popover-header">
      <CdxMenuButton v-model:selected="selectedView" :menu-items="menuItems">
        <CdxIcon :icon="currentItem.icon" />
        {{ currentItem.label }}
      </CdxMenuButton>
      <CdxButton weight="quiet" aria-label="Close" @click="open = false">
        <CdxIcon :icon="cdxIconClose" />
      </CdxButton>
    </div>
    <div class="outline-popover-body">
      <OutlineAccordionList v-if="selectedView === 'outline'" @content-inserted="$emit('content-inserted')" />
    </div>
  </CdxPopover>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CdxPopover, CdxMenuButton, CdxButton, CdxIcon } from '@wikimedia/codex'
import {
  cdxIconListBullet,
  cdxIconCheckAll,
  cdxIconReference,
  cdxIconClose,
} from '@wikimedia/codex-icons'
import OutlineAccordionList from './OutlineAccordionList.vue'

defineEmits(['content-inserted'])
const open = defineModel('open', { type: Boolean, default: false })
const anchorRef = ref(null)
const selectedView = ref('outline')

const menuItems = [
  {
    value: 'outline',
    label: 'Outline',
    description: 'Build off similar articles',
    icon: cdxIconListBullet,
  },
  {
    value: 'verified-facts',
    label: 'Verified facts',
    description: 'From Wikidata',
    icon: cdxIconCheckAll,
  },
  {
    value: 'references',
    label: 'References',
    description: 'From other Wikimedia projects',
    icon: cdxIconReference,
  },
]

const currentItem = computed(
  () => menuItems.find((item) => item.value === selectedView.value) || menuItems[0],
)
</script>

<style scoped>
.outline-popover-anchor {
  width: 0;
  height: 0;
}

.outline-popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-75, 12px);
}

.outline-popover-header :deep(.cdx-menu-button__menu) {
  min-width: 256px;
}

.outline-popover-header :deep(.cdx-menu-button > .cdx-button.cdx-button--weight-quiet) {
  border-color: var(--border-color-base, #a2a9b1);
  background-color: var(--background-color-interactive-subtle);
  font-weight: var(--font-weight-bold);
}

.outline-popover-body {
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

.outline-popover-anchor + :deep(.cdx-popover .cdx-popover__body) {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.outline-popover-anchor + :deep(.cdx-popover) {
  min-height: 50vh !important;
  max-height: 50vh !important;
  display: flex;
  flex-direction: column;
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
