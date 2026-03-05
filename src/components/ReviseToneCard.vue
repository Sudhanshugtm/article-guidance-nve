<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div v-if="isCardVisible" class="revise-tone-card">
        <div class="revise-tone-header">
          <div class="revise-tone-header-content">
            <CdxIcon :icon="cdxIconAlert" class="revise-tone-warning-icon" />
            <span class="revise-tone-title">Revise Tone</span>
          </div>
          <CdxButton
            weight="quiet"
            class="revise-tone-close"
            aria-label="Close"
            @click="onDecline"
          >
            <CdxIcon :icon="cdxIconClose" />
          </CdxButton>
        </div>
        <div class="revise-tone-body">
          <div class="revise-tone-description">
            <p>
              Other editors often revise this kind of wording to have a more balanced tone.
              <a
                href="https://meta.wikimedia.org/wiki/Neutral_point_of_view"
                target="_blank"
                rel="noopener"
              >
                Learn more
              </a>
            </p>
          </div>
          <div class="revise-tone-actions">
            <CdxButton @click="onRevise">Revise</CdxButton>
            <CdxButton @click="onDecline">Decline</CdxButton>
          </div>
          <div class="revise-tone-disclaimer">
            <CdxIcon :icon="cdxIconRobot" size="small" class="revise-tone-disclaimer-icon" />
            <span>
              Identified using a
              <a
                href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Machine_learning_models/Proposed/Tone_Check"
                target="_blank"
                rel="noopener"
              >
                BERT model
              </a>
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { CdxButton, CdxIcon } from '@wikimedia/codex'
import { cdxIconClose, cdxIconAlert, cdxIconRobot } from '@wikimedia/codex-icons'
import { usePeacockDetection } from '../composables/usePeacockDetection'
import { useEditorInstance } from '../composables/useEditorInstance'

const { isCardVisible, revise, decline } = usePeacockDetection()
const { getEditor } = useEditorInstance()

function onRevise() {
  const editor = getEditor()
  if (editor) revise(editor)
}

function onDecline() {
  const editor = getEditor()
  if (editor) decline(editor)
}
</script>

<style scoped>
.revise-tone-card {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: var(--background-color-base, #fff);
  border-top: 1px solid var(--border-color-base, #a2a9b1);
  box-shadow:
    0 -4px 4px 0 rgba(0, 0, 0, 0.06),
    0 0 8px 0 rgba(0, 0, 0, 0.06);
}

.revise-tone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-50, 8px) var(--spacing-100, 16px);
  border-bottom: 1px solid var(--border-color-subtle, #c8ccd1);
}

.revise-tone-header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-75, 12px);
}

.revise-tone-title {
  font-weight: var(--font-weight-bold, 700);
  font-size: var(--font-size-medium, 16px);
  line-height: var(--line-height-small, 22px);
  color: var(--color-base, #202122);
}

.revise-tone-warning-icon {
  color: var(--color-warning, #edab00);
}

.revise-tone-close {
  min-width: 32px !important;
  min-height: 32px !important;
  max-width: 32px;
  max-height: 32px;
  padding: var(--spacing-25, 5px) !important;
}

.revise-tone-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100, 16px);
  padding: var(--spacing-50, 8px) var(--spacing-100, 16px) var(--spacing-100, 16px);
}

.revise-tone-description p {
  margin: 0;
  font-size: var(--font-size-medium, 16px);
  line-height: var(--line-height-small, 22px);
  color: var(--color-subtle, #54595d);
}

.revise-tone-description a {
  color: var(--color-progressive, #36c);
}

.revise-tone-actions {
  display: flex;
  gap: var(--spacing-50, 8px);
}

.revise-tone-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-25, 6px);
  font-size: var(--font-size-small, 14px);
  line-height: var(--line-height-small, 22px);
  color: var(--color-subtle, #54595d);
}

.revise-tone-disclaimer-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 3px;
}

.revise-tone-disclaimer a {
  color: var(--color-progressive, #36c);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
