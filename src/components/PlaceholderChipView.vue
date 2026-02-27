<template>
  <NodeViewWrapper
    as="span"
    class="placeholder-chip"
    :class="{ 'placeholder-chip--selected': selected }"
    @click.stop="onChipClick"
  >
    {{ node.attrs.label }}
  </NodeViewWrapper>
</template>

<script setup>
import { NodeViewWrapper } from '@tiptap/vue-3'
import { usePlaceholderInteraction } from '../composables/usePlaceholderInteraction'

const props = defineProps({
  node: { type: Object, required: true },
  editor: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  getPos: { type: Function, required: true },
})

const { signalPlaceholderClicked } = usePlaceholderInteraction()

function onChipClick() {
  signalPlaceholderClicked(props.node.attrs.label)
}
</script>

<style scoped>
.placeholder-chip {
  display: inline;
  background-color: var(--background-color-neutral-subtle);
  color: var(--color-placeholder);
  border-radius: var(--border-radius-base, 2px);
  padding: 0 var(--spacing-12, 2px);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.placeholder-chip--selected {
  box-shadow: 0 0 0 2px var(--color-progressive);
}
</style>
