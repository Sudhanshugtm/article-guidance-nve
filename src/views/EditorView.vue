<template>
  <div class="editor-page">
    <ResearchToolbar
      :cite-badge-count="citeBadgeCount"
      @cite="onOpenCiteDefault"
      @close="onCloseEditor"
      @publish="onPublish"
    />
    <div
      class="editor-wrapper"
      :class="{
        'rail-open': isRailOpen,
        'check-card-active': isAnyEditorCardActive,
        'cursor-in-check': cursorInCheckParagraph,
      }"
    >
      <div
        class="editor-main"
        :class="{ 'keyboard-visible': showSoftKeyboard }"
        :style="keyboardHeight > 0 ? { '--keyboard-padding': `${keyboardHeight + 24}px` } : {}"
        @click="isRailOpen && (isRailOpen = false)"
      >
        <TextEditor
          :show-settings-button="false"
          @open-outline="onOpenOutline"
          @open-settings="settingsDialogOpen = true"
        />
      </div>
      <div class="editor-rail-column">
        <EditorRail
          :is-open="isRailOpen"
          :initial-view="initialView"
          @content-inserted="onContentInserted"
          @close="isRailOpen = false"
          @open-cite-discover="onOpenCiteDiscover"
        />
      </div>
    </div>

    <!-- Force entry point: + button in the 44px rail strip, aligned with cursor -->
    <div
      v-if="isForceButtonVisible"
      class="force-entry-point"
      :style="forceButtonStyle"
      @mousedown.prevent
      @click.stop="onForceButtonClick"
    >
      <CdxIcon :icon="cdxIconAdd" />
    </div>

    <!-- Per-paragraph check rail indicators -->
    <template v-if="areRailIndicatorsVisible">
      <div
        v-for="(group, gi) in checkGroups"
        :key="gi"
        class="peacock-rail-indicator"
        :style="railStyleForGroup(group)"
        @mousedown.prevent
        @click.stop="onGroupRailClick(gi)"
      >
        <span class="rail-icon-wrapper">
          <CdxIcon :icon="cdxIconAlert" />
          <span v-if="group.count > 1" class="rail-badge">{{ group.count }}</span>
        </span>
      </div>
    </template>

    <OutlinePopover
      v-if="outlineLocation === 'popover'"
      v-model:open="isPopoverOpen"
      :initial-view="initialView"
      @content-inserted="onContentInserted"
      @open-cite-discover="onOpenCiteDiscover"
    />
    <SettingsDialog v-model:open="settingsDialogOpen" />
    <CiteDialog
      v-model:open="citeDialogOpen"
      :initial-tab="citeDialogInitialTab"
      @citation-selected="onCitationSelected"
    />
    <ReviseToneCard />
    <PastedContentCard />
    <CompleteSectionCard />
    <AddReferenceCard
      :visible="isReferenceChoiceVisible"
      @add-citation="onAddReferenceCitation"
      @reject="onRejectReference"
      @close="onDismissReferenceChoice"
    />
    <AddReferenceReasonCard
      :visible="isReferenceReasonVisible"
      @select-reason="onSelectReferenceReason"
      @back="onBackReferenceReason"
      @close="onDismissReferenceReason"
    />
    <SoftKeyboard v-if="showSoftKeyboard" @height-change="onKeyboardHeightChange" />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconAdd, cdxIconAlert } from '@wikimedia/codex-icons'
import TextEditor from '@/components/TextEditor.vue'
import EditorRail from '@/components/EditorRail.vue'
import ResearchToolbar from '@/components/ResearchToolbar.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import CiteDialog from '@/components/CiteDialog.vue'
import OutlinePopover from '@/components/OutlinePopover.vue'
import ReviseToneCard from '@/components/ReviseToneCard.vue'
import PastedContentCard from '@/components/PastedContentCard.vue'
import CompleteSectionCard from '@/components/CompleteSectionCard.vue'
import AddReferenceCard from '@/components/AddReferenceCard.vue'
import AddReferenceReasonCard from '@/components/AddReferenceReasonCard.vue'
import SoftKeyboard from '@/components/SoftKeyboard.vue'
import { useEditorSettings } from '@/composables/useEditorSettings'
import { useEditorInstance } from '@/composables/useEditorInstance'
import { useCursorRect } from '@/composables/useCursorRect'
import { usePlaceholderInteraction } from '@/composables/usePlaceholderInteraction'
import { usePlaceholderDetection } from '@/composables/usePlaceholderDetection'
import { usePeacockDetection } from '@/composables/usePeacockDetection'
import { useEditCheckPagination } from '@/composables/useEditCheckPagination'
import { useCitationRegistry } from '@/composables/useCitationRegistry'
import {
  findFirstPublishPlaceholderTarget,
  findFirstReferenceTarget,
  useReferenceCheck,
} from '@/composables/useReferenceCheck'
import { useTopicContent } from '@/composables/useTopicContent'
import { useAccordionState } from '@/composables/useAccordionState'

const route = useRoute()
const router = useRouter()
const { settings } = useEditorSettings()
const outlineLocation = computed(() => settings.value.outline.location)
const outlinePersistence = computed(() => settings.value.outline.persistence)
const entryPointStyle = computed(() => settings.value.entryPoint.style)
const showSoftKeyboard = computed(() => settings.value.keyboard.display === 'visible')
const currentLang = computed(() =>
  Array.isArray(route.query.lang) ? route.query.lang[0] ?? 'en' : route.query.lang ?? 'en',
)
const currentArticle = computed(() =>
  Array.isArray(route.query.article) ? route.query.article[0] ?? null : route.query.article ?? null,
)
const keyboardHeight = ref(0)
function onKeyboardHeightChange(height) {
  keyboardHeight.value = height
}

// Initialize editor content based on topic (coffee vs default tiger)
const { isCoffeeTopic, topicCitations, sections: topicSections } = useTopicContent()
const { resetWithCitations } = useCitationRegistry()
const { resetForSections } = useAccordionState()
if (isCoffeeTopic.value) {
  resetWithCitations(topicCitations.value)
  resetForSections(topicSections.value)
}

// Force entry point
const { getEditor, hasContent, citationClickCount } = useEditorInstance()
const { activePlaceholderPos } = usePlaceholderInteraction()
const {
  usedCitations,
  availableCitations,
  insertCitation,
  clickedCitationPos,
  setClickedCitationPos,
  clearClickedCitationPos,
} = useCitationRegistry()
const { cursorRect } = useCursorRect()
const { triggerDetectionOnInsert } = usePeacockDetection()
const { showPublishPlaceholderCard } = usePlaceholderDetection()
const {
  activeChecks,
  checkGroups,
  totalGroups,
  isAnyCardActive,
  cursorInCheckParagraph,
  showGroupAtIndex,
  dismissAllCards,
} = useEditCheckPagination()
const {
  phase: referenceCheckPhase,
  activeTarget: activeReferenceTarget,
  isReferenceChoiceVisible,
  isReferenceReasonVisible,
  beginChecking,
  showReferenceChoice,
  dismissChoice,
  rejectReference,
  dismissReason,
  chooseReason,
  beginCiteDialog,
  cancelCiteDialog,
  resolveAfterCitation,
  resolvePublishAttempt,
  reset: resetReferenceCheck,
} = useReferenceCheck()
const pendingCitationInsertionPos = ref(null)
const dismissedReferenceGate = ref(null)
const isAnyPublishReferenceCardVisible = computed(
  () => isReferenceChoiceVisible.value || isReferenceReasonVisible.value,
)
const isAnyEditorCardActive = computed(
  () => isAnyCardActive.value || isAnyPublishReferenceCardVisible.value,
)

// Per-paragraph rail indicators
const areRailIndicatorsVisible = computed(() => {
  if (isRailOpen.value || isPopoverOpen.value || isAnyPublishReferenceCardVisible.value)
    return false
  return totalGroups.value > 0
})

function railStyleForGroup(group) {
  if (!group.rect) return {}
  return {
    position: 'fixed',
    top: `${group.rect.top}px`,
    right: 'var(--editor-shell-offset)',
    width: '44px',
    height: `${group.rect.height}px`,
  }
}

const isForceButtonVisible = computed(() => {
  if (!['inline', 'force', 'quiet', 'text', 'floating'].includes(entryPointStyle.value))
    return false
  if (isRailOpen.value || isPopoverOpen.value) return false
  if (isAnyPublishReferenceCardVisible.value) return false
  if (!cursorRect.value) return false
  if (areRailIndicatorsVisible.value && cursorInCheckParagraph.value) return false
  return cursorRect.value.visible
})

const forceButtonStyle = computed(() => {
  if (!cursorRect.value) return {}
  const rect = cursorRect.value
  const halfLeading = (rect.lineHeight - rect.glyphHeight) / 2
  return {
    position: 'fixed',
    top: `${rect.top - halfLeading}px`,
    right: 'var(--editor-shell-offset)',
    width: '44px',
    height: `${rect.lineHeight}px`,
  }
})

const isRailOpen = ref(false)
const isPopoverOpen = ref(false)
const settingsDialogOpen = ref(false)
const citeDialogOpen = ref(false)
const citeDialogInitialTab = ref('automatic')
const initialView = ref(null)

function onForceButtonClick() {
  // Capture placeholder state before blur clears it
  const editor = getEditor()
  const hadPlaceholder =
    editor?.state.selection.node?.type.name === 'placeholderChip' ||
    activePlaceholderPos.value !== null
  editor?.commands.blur()
  initialView.value = hadPlaceholder ? 'verified-facts' : null
  if (outlineLocation.value === 'popover') {
    isPopoverOpen.value = true
  } else {
    isRailOpen.value = true
  }
}

function onGroupRailClick(groupIndex) {
  const editor = getEditor()
  editor?.commands.blur()
  showGroupAtIndex(groupIndex, editor)
}

function onOpenOutline(payload) {
  const hadPlaceholder =
    payload?.hadPlaceholder || activePlaceholderPos.value !== null
  initialView.value = hadPlaceholder ? 'verified-facts' : null

  if (outlineLocation.value === 'popover') {
    isPopoverOpen.value = true
  } else {
    isRailOpen.value = true
  }
}

const citeBadgeSetting = computed(() => settings.value.cite.badge)
const citeBadgeDismissed = ref(false)
const citeBadgeCount = computed(() =>
  citeBadgeSetting.value === 'hidden' || citeBadgeDismissed.value
    ? 0
    : topicCitations.value.length,
)

function onOpenCiteDefault() {
  citeBadgeDismissed.value = true
  const hasCitations = usedCitations.value.length > 0 || availableCitations.value.length > 0
  citeDialogInitialTab.value = hasCitations ? 'reuse' : 'automatic'
  citeDialogOpen.value = true
}

function onOpenCiteDiscover() {
  citeDialogInitialTab.value = 'discover'
  citeDialogOpen.value = true
}

function getDocumentFingerprint(editor) {
  return JSON.stringify(editor.state.doc.toJSON())
}

function getReferenceTargetKey(target) {
  if (!target) return null
  return JSON.stringify({
    kind: target.kind,
    paragraphRange: target.paragraphRange,
    insertionPos: target.insertionPos,
    placeholderPos: target.placeholderPos,
  })
}

function shouldBypassReferenceGate(editor, target) {
  if (!editor || !target || !dismissedReferenceGate.value) return false

  return (
    dismissedReferenceGate.value.docFingerprint === getDocumentFingerprint(editor) &&
    dismissedReferenceGate.value.targetKey === getReferenceTargetKey(target)
  )
}

function onPublish() {
  const editor = getEditor()
  if (!editor) return

  dismissAllCards(editor)
  pendingCitationInsertionPos.value = null
  clearClickedCitationPos()
  resetReferenceCheck()
  beginChecking()

  const placeholderTarget = findFirstPublishPlaceholderTarget(editor.state.doc)
  if (placeholderTarget) {
    showPublishPlaceholderCard(placeholderTarget, editor)
    return
  }

  const referenceTarget = findFirstReferenceTarget(editor.state.doc)
  if (referenceTarget) {
    if (shouldBypassReferenceGate(editor, referenceTarget)) {
      resolvePublishAttempt()
      resetReferenceCheck()
      return
    }
    showReferenceChoice(referenceTarget)
    return
  }

  dismissedReferenceGate.value = null
  resolvePublishAttempt()
  resetReferenceCheck()
}

function onAddReferenceCitation() {
  const editor = getEditor()
  const target = activeReferenceTarget.value
  if (!editor || !target) return
  if (!beginCiteDialog()) return

  dismissedReferenceGate.value = null

  if (target.kind === 'citation-placeholder') {
    pendingCitationInsertionPos.value = null
    setClickedCitationPos(target.placeholderPos)
  } else {
    clearClickedCitationPos()
    pendingCitationInsertionPos.value = target.insertionPos
  }

  onOpenCiteDefault()
}

function onRejectReference() {
  rejectReference()
}

function onDismissReferenceChoice() {
  dismissChoice()
}

function onDismissReferenceReason() {
  dismissReason()
}

function onBackReferenceReason() {
  const target = activeReferenceTarget.value
  if (!target) {
    resetReferenceCheck()
    return
  }
  showReferenceChoice(target)
}

function onSelectReferenceReason(reason) {
  const editor = getEditor()
  if (editor && activeReferenceTarget.value) {
    dismissedReferenceGate.value = {
      docFingerprint: getDocumentFingerprint(editor),
      targetKey: getReferenceTargetKey(activeReferenceTarget.value),
      reason,
    }
  }
  chooseReason(reason)
  resetReferenceCheck()
}

function onCloseEditor() {
  if (currentArticle.value) {
    router.replace({
      name: 'article',
      query: {
        lang: currentLang.value,
        article: currentArticle.value,
      },
    })
    return
  }

  router.replace({
    name: 'articles',
    query: { lang: currentLang.value },
  })
}

// Track whether the popover/rail should stay open after content insertion
const keepOpenAfterInsert = ref(false)

function onContentInserted() {
  hasContent.value = true
  if (outlinePersistence.value === 'close') {
    isRailOpen.value = false
    isPopoverOpen.value = false
  } else {
    // Set flag so the watcher can re-open the popover if focus-loss closes it
    keepOpenAfterInsert.value = true
  }

  // Check the previous paragraph for peacock words after rail insertion
  nextTick(() => {
    const editor = getEditor()
    if (editor) triggerDetectionOnInsert(editor)
  })
}

// When the popover closes due to focus moving to the editor after insertion,
// re-open it if the keep-open flag is set
watch(isPopoverOpen, (newVal) => {
  if (!newVal && keepOpenAfterInsert.value) {
    keepOpenAfterInsert.value = false
    isPopoverOpen.value = true
  }
})

watch(citationClickCount, () => {
  onOpenCiteDefault()
})

// Clear clicked citation position when dialog closes without selection
watch(citeDialogOpen, (isOpen) => {
  if (!isOpen) {
    clearClickedCitationPos()
    pendingCitationInsertionPos.value = null
    if (referenceCheckPhase.value === 'awaiting-cite-dialog') {
      cancelCiteDialog()
    }
  }
})

function onCitationSelected(citation) {
  const editor = getEditor()
  if (!editor) return

  const refNumber = insertCitation(citation)
  const label = String(refNumber)
  const pos = clickedCitationPos.value
  const insertionPos = pendingCitationInsertionPos.value

  if (pos !== null) {
    // Replace the clicked "Add a citation" placeholder node
    const node = editor.state.doc.nodeAt(pos)
    if (node && node.type.name === 'citationSuperscript') {
      editor
        .chain()
        .focus()
        .command(({ tr }) => {
          tr.setNodeMarkup(pos, null, { label, citationId: citation.id, isPlaceholder: false })
          return true
        })
        .run()
    }
    clearClickedCitationPos()
  } else if (insertionPos !== null) {
    editor
      .chain()
      .focus()
      .insertContentAt(insertionPos, {
        type: 'citationSuperscript',
        attrs: { label, citationId: citation.id, isPlaceholder: false },
      })
      .run()
    pendingCitationInsertionPos.value = null
  } else {
    // No placeholder was clicked — insert at current cursor position
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'citationSuperscript',
        attrs: { label, citationId: citation.id, isPlaceholder: false },
      })
      .run()
  }

  resolveAfterCitation()
}

watch(outlineLocation, () => {
  isRailOpen.value = false
  isPopoverOpen.value = false
})
</script>

<style scoped>
.editor-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  --rail-strip-width: 44px;
  --panel-width: calc(var(--editor-shell-width) - var(--rail-strip-width));
}

.editor-wrapper {
  display: flex;
  padding-top: 48px;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}

.editor-wrapper.rail-open {
  transform: translateX(calc(-1 * (var(--panel-width) - var(--rail-strip-width))));
}

.editor-main {
  flex: 0 0 var(--panel-width);
  min-width: var(--panel-width);
  display: flex;
  flex-direction: column;
}

.editor-rail-column {
  flex: 0 0 var(--rail-strip-width);
  min-width: var(--rail-strip-width);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: flex-basis 0.3s ease, min-width 0.3s ease;
}

.editor-wrapper.rail-open .editor-rail-column {
  flex-basis: var(--panel-width);
  min-width: var(--panel-width);
}

.editor-main.keyboard-visible :deep(.ProseMirror) {
  padding-bottom: var(--keyboard-padding, 0);
}

.force-entry-point {
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 2px solid var(--border-color-interactive);
  box-sizing: border-box;
  cursor: pointer;
  z-index: 2;
}

.force-entry-point :deep(.cdx-icon) {
  color: var(--color-base);
}

.peacock-rail-indicator {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-left: 2px solid var(--color-warning);
  box-sizing: border-box;
  cursor: pointer;
  z-index: 2;
}

.rail-icon-wrapper {
  position: relative;
  display: inline-flex;
}

.peacock-rail-indicator :deep(.cdx-icon) {
  color: var(--color-warning);
}

.rail-badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  min-width: 12px;
  min-height: 12px;
  padding: 1px 2px;
  background-color: var(--background-color-progressive, #36c);
  border: 1px solid var(--border-color-inverted, #fff);
  border-radius: var(--border-radius-base, 2px);
  color: var(--color-inverted, #fff);
  font-size: var(--font-size-x-small, 12px);
  font-weight: var(--font-weight-bold, 700);
  line-height: 12px;
  text-align: center;
}

.editor-wrapper.check-card-active :deep(.peacock-highlight) {
  background-color: transparent;
}

.editor-wrapper.check-card-active :deep(.paste-highlight) {
  background-color: transparent;
}

.editor-wrapper.check-card-active :deep(.placeholder-detection-highlight) {
  background-color: transparent;
}

/* Ensure promoted (warning) highlights always show over the suppression */
.editor-wrapper.check-card-active :deep(.peacock-highlight-warning) {
  background-color: var(--background-color-warning-subtle, #fef6e7);
}

.editor-wrapper.check-card-active :deep(.paste-highlight-warning) {
  background-color: var(--background-color-warning-subtle, #fef6e7);
}

.editor-wrapper.check-card-active :deep(.placeholder-detection-highlight-warning) {
  background-color: var(--background-color-warning-subtle, #fdf2d5);
}

/* Hide highlight when cursor is in the flagged paragraph and card is closed */
.editor-wrapper.cursor-in-check:not(.check-card-active) :deep(.peacock-highlight) {
  background-color: transparent;
}

.editor-wrapper.cursor-in-check:not(.check-card-active) :deep(.paste-highlight) {
  background-color: transparent;
}

@media (min-width: 768px) {
  .editor-page {
    display: flex;
    flex-direction: column;
  }

  .editor-wrapper {
    flex: 1;
    min-height: 0;
    height: auto;
    padding-top: 0;
  }
}
</style>
