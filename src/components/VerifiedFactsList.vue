<template>
  <div class="verified-facts-cards">
    <CdxCard
      v-for="fact in facts"
      :key="fact.title"
      :icon="cdxIconAdd"
      @click="onInsertFact(fact)"
    >
      <template #title>{{ fact.title }}</template>
      <template #description>{{ fact.description }}</template>
      <template #supporting-text>
        <a
          :href="fact.wikidataUrl"
          target="_blank"
          rel="noopener"
          class="reference-link"
          @click.stop
        >
          {{ fact.references.length }} {{ fact.references.length === 1 ? 'reference' : 'references' }}
        </a>
      </template>
    </CdxCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CdxCard } from '@wikimedia/codex'
import { cdxIconAdd } from '@wikimedia/codex-icons'
import { useEditorInstance } from '../composables/useEditorInstance'
import { useLocale } from '../composables/useLocale'

const emit = defineEmits(['content-inserted'])
const { insertContent } = useEditorInstance()
const { locale } = useLocale()

const facts = computed(() => locale.value.facts)

function onInsertFact(fact) {
  insertContent(fact.title)
  emit('content-inserted')
}
</script>

<style scoped>
.verified-facts-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-75);
}

.verified-facts-cards :deep(.cdx-card) {
  background-color: var(--background-color-transparent);
}

.reference-link {
  color: var(--color-progressive);
  text-decoration: none;
}

.reference-link:hover {
  text-decoration: underline;
}
</style>
