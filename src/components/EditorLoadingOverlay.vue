<!-- ABOUTME: MobileFrontend-style bottom drawer shown when clicking a red link. -->
<!-- ABOUTME: Displays "This page has not yet been created." with Create page / No thanks options. -->

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CdxButton, CdxIcon } from '@wikimedia/codex'
import { cdxIconExpand } from '@wikimedia/codex-icons'
import { useLocale } from '@/composables/useLocale'

const props = defineProps({
  editorQuery: { type: Object, required: true },
})

const emit = defineEmits(['cancel'])
const router = useRouter()
const { locale } = useLocale()

const isVisible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})

function onCreatePage() {
  router.push({ name: 'editor', query: props.editorQuery })
}

function onCancel() {
  isVisible.value = false
  setTimeout(() => emit('cancel'), 200)
}
</script>

<template>
  <div class="editor-loading-overlay">
    <div
      class="drawer-container__mask"
      :class="{ 'drawer-container__mask--visible': isVisible }"
      @click="onCancel"
    />
    <div
      class="drawer drawer-container__drawer position-fixed"
      :class="{ visible: isVisible }"
    >
      <!-- Collapse chevron -->
      <button class="drawer__collapse" type="button" :aria-label="locale.toolbar.close" @click="onCancel">
        <CdxIcon :icon="cdxIconExpand" />
      </button>

      <p class="drawer__message">{{ locale.reading.redlinkExplain }}</p>

      <CdxButton
        class="drawer__create-btn"
        action="progressive"
        weight="primary"
        @click="onCreatePage"
      >
        {{ locale.reading.redlinkCreate }}
      </CdxButton>

      <a href="#" class="drawer__dismiss" @click.prevent="onCancel">
        {{ locale.reading.redlinkLeave }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.editor-loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
}

/* Dark mask behind the drawer */
.drawer-container__mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: opacity 100ms ease-in-out;
  pointer-events: auto;
}

.drawer-container__mask--visible {
  opacity: 0.2;
}

/* Bottom drawer panel */
.drawer-container__drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  background: var(--background-color-base, #fff);
  border-top: 1px solid var(--border-color-subtle, #c8ccd1);
  text-align: center;
  padding: 0 16px 24px;
  max-width: 500px;
  margin: 0 auto;
  transform: translateY(100%);
  transition: transform 200ms ease;
  pointer-events: auto;
}

.drawer-container__drawer.visible {
  transform: translateY(0);
}

/* Collapse/chevron button at top */
.drawer__collapse {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 0 4px;
  border: none;
  background: transparent;
  color: var(--color-subtle, #72777d);
  cursor: pointer;
}

.drawer__message {
  font-family: var(--font-family-system-sans, sans-serif);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-base, #202122);
  margin: 8px 0 16px;
}

.drawer__create-btn {
  display: block;
  width: auto;
  margin: 0 auto 12px;
}

.drawer__dismiss {
  display: inline-block;
  font-family: var(--font-family-system-sans, sans-serif);
  font-size: 0.9rem;
  color: var(--color-progressive, #36c);
  text-decoration: none;
}

.drawer__dismiss:hover {
  text-decoration: underline;
}

/* Desktop: constrain to the app shell viewport */
@media (min-width: 768px) {
  .editor-loading-overlay {
    top: 16px;
    bottom: 16px;
    left: var(--editor-shell-offset);
    width: var(--editor-shell-width);
    border-radius: 24px;
    overflow: hidden;
  }

  .drawer-container__mask {
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  .drawer-container__drawer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: none;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }
}
</style>
