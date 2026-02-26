<template>
  <div class="editor-rail">
    <div class="rail-body">
      <OutlineAccordionList />
    </div>
  </div>
</template>

<script setup>
import OutlineAccordionList from './OutlineAccordionList.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})
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
  justify-content: flex-start;
  height: 48px;
  min-height: 48px;
  border-bottom: 1px solid var(--border-color-subtle);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: var(--background-color-base);
}

.rail-publish-btn {
  width: 44px;
  height: 100%;
  border-radius: 0;
}

.rail-publish-btn :deep(.cdx-icon) {
  color: var(--color-inverted);
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
