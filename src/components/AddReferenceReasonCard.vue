<template>
  <EditCheckCard
    :title="locale.editChecks.addReference.reasonTitle"
    :visible="visible"
    :show-pagination="false"
    @close="onClose"
  >
    <template #description>
      <p>{{ locale.editChecks.addReference.reasonDescription }}</p>
    </template>
    <template #actions>
      <div class="add-reference-feedback">
        <div class="add-reference-reason-list">
          <CdxRadio
            v-for="reason in locale.editChecks.addReference.reasons"
            :key="reason.id"
            v-model="selectedReason"
            :input-value="reason.id"
            name="add-reference-reason"
          >
            {{ reason.label }}
          </CdxRadio>
        </div>
        <div class="add-reference-feedback-actions">
          <CdxButton weight="quiet" @click="$emit('back')">
            {{ locale.editChecks.addReference.back }}
          </CdxButton>
          <CdxButton action="progressive" weight="primary" :disabled="!selectedReason" @click="onSubmit">
            {{ locale.editChecks.addReference.submit }}
          </CdxButton>
        </div>
      </div>
    </template>
  </EditCheckCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CdxButton, CdxRadio } from '@wikimedia/codex'
import EditCheckCard from './EditCheckCard.vue'
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  visible: { type: Boolean, default: false },
})

const emit = defineEmits(['select-reason', 'close', 'back'])

const { locale } = useLocale()
const selectedReason = ref('')

watch(
  () => props.visible,
  (visible) => {
    if (!visible) selectedReason.value = ''
  },
)

function onSubmit() {
  if (!selectedReason.value) return
  emit('select-reason', selectedReason.value)
  selectedReason.value = ''
}

function onClose() {
  selectedReason.value = ''
  emit('close')
}
</script>

<style scoped>
.add-reference-feedback {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100, 16px);
}

.add-reference-reason-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-50, 8px);
}

.add-reference-feedback-actions {
  display: flex;
  gap: var(--spacing-75, 12px);
}

.add-reference-reason-list :deep(.cdx-radio) {
  align-items: flex-start;
}

.add-reference-reason-list :deep(.cdx-radio__label) {
  line-height: var(--line-height-small, 22px);
}
</style>
