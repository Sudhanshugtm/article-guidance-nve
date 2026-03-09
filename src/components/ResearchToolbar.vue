<template>
  <div class="research-toolbar">
    <div class="research-toolbar__lhs">
      <CdxButton
        class="research-toolbar__btn research-toolbar__btn--close"
        weight="quiet"
        aria-label="Close"
        @click="emit('close')"
      >
        <CdxIcon :icon="cdxIconClose" />
      </CdxButton>
    </div>
    <div class="research-toolbar__ctr">
      <CdxButton
        class="research-toolbar__btn"
        weight="quiet"
        aria-label="Undo"
        :disabled="!canUndo"
        @click="getEditor()?.chain().focus().undo().run()"
      >
        <CdxIcon :icon="cdxIconUndo" />
      </CdxButton>
      <div ref="styleAnchorRef" class="research-toolbar__style-anchor">
        <CdxButton
          class="research-toolbar__btn research-toolbar__btn--dropdown"
          :class="{ 'research-toolbar__btn--active': isStyleMenuOpen }"
          weight="quiet"
          aria-label="Style text"
          @click="toggleStyleMenu"
        >
          <CdxIcon :icon="cdxIconTextStyle" />
          <CdxIcon :icon="cdxIconExpand" class="research-toolbar__indicator" />
        </CdxButton>
      </div>
      <CdxPopover
        v-model:open="isStyleMenuOpen"
        :anchor="styleAnchorRef"
        placement="bottom-start"
        :render-in-place="true"
      >
        <div class="research-toolbar__style-menu">
          <button
            class="research-toolbar__style-item"
            :class="{ 'research-toolbar__style-item--active': isBoldActive }"
            type="button"
            @click="applyBold"
          >
            <span class="research-toolbar__style-icon research-toolbar__style-icon--bold">B</span>
            <span class="research-toolbar__style-label">Bold</span>
          </button>
          <button
            class="research-toolbar__style-item"
            :class="{ 'research-toolbar__style-item--active': isItalicActive }"
            type="button"
            @click="applyItalic"
          >
            <span class="research-toolbar__style-icon research-toolbar__style-icon--italic">I</span>
            <span class="research-toolbar__style-label">Italic</span>
          </button>
        </div>
      </CdxPopover>
      <CdxButton class="research-toolbar__btn" weight="quiet" aria-label="Cite" @click="emit('cite')">
        <span class="research-toolbar__cite-icon-wrapper">
          <CdxIcon :icon="cdxIconQuotes" />
          <span v-if="citeBadgeCount > 0" class="research-toolbar__cite-badge">{{
            citeBadgeCount
          }}</span>
        </span>
      </CdxButton>
      <CdxButton class="research-toolbar__btn" weight="quiet" aria-label="Link">
        <CdxIcon :icon="cdxIconLink" />
      </CdxButton>
      <CdxButton
        class="research-toolbar__btn research-toolbar__btn--dropdown"
        weight="quiet"
        aria-label="Switch editor"
      >
        <CdxIcon :icon="cdxIconEdit" />
        <CdxIcon :icon="cdxIconExpand" class="research-toolbar__indicator" />
      </CdxButton>
    </div>
    <div class="research-toolbar__rhs">
      <CdxButton
        class="research-toolbar__btn research-toolbar__btn--publish"
        action="progressive"
        weight="primary"
        aria-label="Publish"
        :disabled="!hasContent"
      >
        <CdxIcon :icon="cdxIconNext" />
      </CdxButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CdxButton, CdxIcon, CdxPopover } from '@wikimedia/codex'
import { useEditorInstance } from '../composables/useEditorInstance'
import {
  cdxIconClose,
  cdxIconUndo,
  cdxIconTextStyle,
  cdxIconLink,
  cdxIconQuotes,
  cdxIconEdit,
  cdxIconExpand,
  cdxIconNext,
} from '@wikimedia/codex-icons'

defineProps({
  citeBadgeCount: { type: Number, default: 0 },
})

const emit = defineEmits(['cite', 'close'])
const { hasContent, getEditor, canUndo } = useEditorInstance()
const styleAnchorRef = ref(null)
const isStyleMenuOpen = ref(false)
const isBoldActive = ref(false)
const isItalicActive = ref(false)

function refreshStyleState() {
  const editor = getEditor()
  isBoldActive.value = editor?.isActive('bold') ?? false
  isItalicActive.value = editor?.isActive('italic') ?? false
}

function toggleStyleMenu() {
  refreshStyleState()
  isStyleMenuOpen.value = !isStyleMenuOpen.value
}

function applyBold() {
  getEditor()?.chain().focus().toggleBold().run()
  refreshStyleState()
  isStyleMenuOpen.value = false
}

function applyItalic() {
  getEditor()?.chain().focus().toggleItalic().run()
  refreshStyleState()
  isStyleMenuOpen.value = false
}
</script>

<style scoped>
.research-toolbar {
  position: fixed;
  z-index: 3;
  display: flex;
  height: 48px;
  background-color: var(--background-color-base, #fff);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-bottom: var(--border-subtle);
  left: var(--editor-shell-offset);
  width: var(--editor-shell-width);
}

.research-toolbar__lhs {
  flex: 0 0 44px;
  display: flex;
}

.research-toolbar__ctr {
  flex: 1;
  display: flex;
  min-width: 0;
  overflow: clip;
}

.research-toolbar__rhs {
  flex: 0 0 44px;
  display: flex;
  overflow: clip;
}

.research-toolbar__btn {
  flex: 1 0 0;
  height: 100%;
  border-radius: 0;
  padding: 0;
}

.research-toolbar__btn:focus {
  border-color: transparent !important;
  box-shadow: none !important;
}

.research-toolbar__btn--close {
  border-right: 1px solid var(--border-color-subtle) !important;
}

.research-toolbar__style-anchor {
  display: flex;
  flex: 1 0 0;
}

.research-toolbar__btn--dropdown {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.research-toolbar__btn--active {
  background-color: #eaf3ff !important;
  color: #36c !important;
}

.research-toolbar__btn--publish {
  flex: 0 0 44px;
  width: 44px;
  height: 100%;
}

.research-toolbar__style-menu {
  display: flex;
  flex-direction: column;
  width: 292px;
  padding: 4px 0;
  background-color: #fff;
}

.research-toolbar__style-item {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-height: 52px;
  padding: 0 18px;
  border: 0;
  background: transparent;
  color: #202122;
  font: inherit;
  font-size: 1.05rem;
  text-align: left;
}

.research-toolbar__style-item:hover {
  background-color: #f8f9fa;
}

.research-toolbar__style-item--active {
  background-color: #f0f4ff;
  color: #36c;
}

.research-toolbar__style-item--active .research-toolbar__style-icon {
  color: #36c;
}

.research-toolbar__style-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  color: #202122;
  font-size: 2rem;
  line-height: 1;
}

.research-toolbar__style-icon--bold {
  font-weight: 700;
}

.research-toolbar__style-icon--italic {
  font-style: italic;
}

.research-toolbar__style-label {
  line-height: 1.2;
}

.research-toolbar__cite-icon-wrapper {
  position: relative;
  display: inline-flex;
}

.research-toolbar__cite-badge {
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

.research-toolbar__indicator {
  min-width: 10px;
  min-height: 10px;
  width: 10px;
  height: 10px;
}

:deep(.cdx-popover) {
  z-index: 4;
  width: 292px;
  max-width: 292px;
  padding: 0 !important;
  margin-top: -15px !important;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

:deep(.cdx-popover__body) {
  padding: 0;
  border-radius: 0;
  overflow: hidden;
}

:deep(.cdx-popover__arrow) {
  display: none !important;
}
</style>
