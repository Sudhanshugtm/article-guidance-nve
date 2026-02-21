<template>
  <div class="editor-page">
    <CdxToolbar />
    <div class="editor-wrapper" :class="{ 'rail-open': isRailOpen }">
      <div class="editor-main" @click="isRailOpen && (isRailOpen = false)">
        <TextEditor @open-rail="isRailOpen = true" />
      </div>
      <div class="editor-rail-column">
        <EditorRail :is-open="isRailOpen" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EditorToolbar from '@/components/EditorToolbar.vue'
import TextEditor from '@/components/TextEditor.vue'
import EditorRail from '@/components/EditorRail.vue'
import CdxToolbar from '@/components/CdxToolbar.vue'

const isRailOpen = ref(false)
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
