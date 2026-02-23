<template>
  <CdxAccordion
    v-for="section in articleSections"
    :key="section.title"
    separation="minimal"
  >
    <template #title>{{ section.title }}</template>
    <template #description>{{ section.description }}</template>
  </CdxAccordion>
</template>

<script setup>
import { CdxAccordion } from '@wikimedia/codex'
import { articleSections } from '../config/articleSections.js'
</script>
