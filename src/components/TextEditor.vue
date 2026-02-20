<template>
  <div class="text-editor" contenteditable="true"></div>
</template>

<script setup></script>

<style scoped>
.text-editor {
  flex: 1;
  padding: var(--spacing-100);
  background-color: var(--background-color-base);
  outline: none;
  overflow-y: auto;
}
</style>
