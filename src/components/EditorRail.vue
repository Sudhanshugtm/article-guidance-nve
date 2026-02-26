<template>
  <div class="editor-rail">
    <div class="rail-header">
      <CdxMenuButton v-model:selected="selectedView" :menu-items="menuItems">
        <CdxIcon :icon="currentItem.icon" />
        {{ currentItem.label }}
      </CdxMenuButton>
      <CdxButton weight="quiet" aria-label="Close" @click="$emit('close')">
        <CdxIcon :icon="cdxIconClose" />
      </CdxButton>
    </div>
    <div class="rail-body">
      <OutlineAccordionList
        v-if="selectedView === 'outline'"
        @content-inserted="$emit('content-inserted')"
      />
      <VerifiedFactsList
        v-if="selectedView === 'verified-facts'"
        @content-inserted="$emit('content-inserted')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CdxMenuButton, CdxButton, CdxIcon } from '@wikimedia/codex'
import {
  cdxIconListBullet,
  cdxIconCheckAll,
  cdxIconReference,
  cdxIconClose,
} from '@wikimedia/codex-icons'
import OutlineAccordionList from './OutlineAccordionList.vue'
import VerifiedFactsList from './VerifiedFactsList.vue'

defineEmits(['content-inserted', 'close'])
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

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
.editor-rail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--background-color-neutral-subtle);
}

.rail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-100) var(--spacing-100) 0 44px;
}

.rail-header :deep(.cdx-menu-button__menu) {
  min-width: 256px;
}

.rail-header :deep(.cdx-menu-button > .cdx-button.cdx-button--weight-quiet) {
  border-color: var(--border-color-interactive);
  background-color: var(--background-color-interactive-subtle);
  font-weight: var(--font-weight-bold);
}

.rail-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-100) var(--spacing-100) 0 44px;
}

.rail-body :deep(.cdx-accordion__content) {
  font-family: var(--font-family-system-sans);
}
</style>
