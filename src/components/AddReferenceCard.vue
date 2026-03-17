<template>
  <EditCheckCard
    :title="locale.editChecks.addReference.title"
    :visible="visible"
    :show-pagination="false"
    @close="$emit('close')"
  >
    <template #description>
      <p>{{ locale.editChecks.addReference.description }}</p>
    </template>
    <template #actions>
      <div class="add-reference-buttons">
        <CdxButton action="progressive" weight="primary" @click="$emit('add-citation')">
          {{ locale.editChecks.addReference.addCitation }}
        </CdxButton>
        <CdxButton weight="quiet" @click="$emit('reject')">
          {{ locale.editChecks.addReference.reject }}
        </CdxButton>
      </div>
    </template>
  </EditCheckCard>
</template>

<script setup>
import { CdxButton } from '@wikimedia/codex'
import EditCheckCard from './EditCheckCard.vue'
import { useLocale } from '../composables/useLocale'

defineProps({
  visible: { type: Boolean, default: false },
})

defineEmits(['add-citation', 'reject', 'close'])

const { locale } = useLocale()
</script>

<style scoped>
.add-reference-buttons {
  display: flex;
  gap: var(--spacing-75, 12px);
}
</style>
