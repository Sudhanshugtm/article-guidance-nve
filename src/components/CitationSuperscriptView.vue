<template>
  <NodeViewWrapper as="span" class="citation-superscript" @click.stop="onCitationClick">[{{ node.attrs.label }}]</NodeViewWrapper>
</template>

<script setup>
import { NodeViewWrapper } from '@tiptap/vue-3'
import { useEditorInstance } from '../composables/useEditorInstance'

defineProps({
  node: { type: Object, required: true },
  editor: { type: Object, required: true },
  getPos: { type: Function, required: true },
})

const { signalCitationClicked } = useEditorInstance()

function onCitationClick() {
  signalCitationClicked()
}
</script>

<style scoped>
.citation-superscript {
  display: inline;
  color: var(--color-progressive);
  cursor: pointer;
  font-size: 0.75em;
  vertical-align: top;
  line-height: 1;
  user-select: none;
  -webkit-user-select: none;
}
</style>
