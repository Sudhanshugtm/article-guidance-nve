<template>
  <div class="cite-dialog">
    <CdxDialog
      v-model:open="open"
      :title="locale.cite.title"
      :use-close-button="true"
      :render-in-place="true"
    >
      <CdxTabs v-model:active="activeTab" :framed="true">
        <CdxTab name="automatic" :label="locale.cite.automatic">
          <div class="cite-dialog__tab-content">
            <p class="cite-dialog__description">
              {{ locale.cite.automaticDesc }}
            </p>
            <CdxSearchInput
              v-model="searchQuery"
              :use-button="true"
              :hide-icon="true"
              :button-label="locale.cite.create"
              :placeholder="locale.cite.placeholder"
            />
            <div>
              <CdxButton>
                <CdxIcon :icon="cdxIconLogoWikidata" />
                {{ locale.cite.scanIsbn }}
              </CdxButton>
            </div>
          </div>
        </CdxTab>
        <CdxTab name="manual" :label="locale.cite.manual">
          <div class="cite-dialog__tab-content">
            <p class="cite-dialog__description"></p>
          </div>
        </CdxTab>
        <CdxTab name="reuse" :label="locale.cite.reuse">
          <div class="cite-dialog__reuse">
            <div class="cite-dialog__reuse-search">
              <CdxSearchInput
                v-model="reuseSearchQuery"
                :placeholder="locale.cite.reusePlaceholder"
              />
            </div>
            <div class="cite-dialog__reuse-list">
              <!-- Used citations: numbered, shown first -->
              <div
                v-for="citation in usedCitations"
                :key="citation.id"
                class="cite-dialog__reuse-item cite-dialog__reuse-item--clickable"
                @click="onSelectCitation(citation)"
              >
                <span class="cite-dialog__reuse-number">[{{ citation.referenceNumber }}]</span>
                <span class="cite-dialog__reuse-text">
                  <template v-for="(segment, sIndex) in citation.segments" :key="sIndex">
                    <a
                      v-if="segment.style === 'link'"
                      class="cite-dialog__reuse-link"
                      href="#"
                      @click.prevent.stop
                      >{{ segment.text }}</a
                    >
                    <a
                      v-else-if="segment.style === 'link-italic'"
                      class="cite-dialog__reuse-link"
                      href="#"
                      @click.prevent.stop
                      ><i>{{ segment.text }}</i></a
                    >
                    <i v-else-if="segment.style === 'italic'">{{ segment.text }}</i>
                    <span v-else>{{ segment.text }}</span>
                  </template>
                </span>
              </div>

              <!-- Available citations: no number -->
              <div
                v-for="citation in availableCitations"
                :key="citation.id"
                class="cite-dialog__reuse-item cite-dialog__reuse-item--clickable"
                @click="onSelectCitation(citation)"
              >
                <span class="cite-dialog__reuse-text">
                  <template v-for="(segment, sIndex) in citation.segments" :key="sIndex">
                    <a
                      v-if="segment.style === 'link'"
                      class="cite-dialog__reuse-link"
                      href="#"
                      @click.prevent.stop
                      >{{ segment.text }}</a
                    >
                    <a
                      v-else-if="segment.style === 'link-italic'"
                      class="cite-dialog__reuse-link"
                      href="#"
                      @click.prevent.stop
                      ><i>{{ segment.text }}</i></a
                    >
                    <i v-else-if="segment.style === 'italic'">{{ segment.text }}</i>
                    <span v-else>{{ segment.text }}</span>
                  </template>
                </span>
              </div>
            </div>
          </div>
        </CdxTab>
        <CdxTab name="discover" :label="locale.cite.discover">
          <div class="cite-dialog__discover">
            <div class="cite-dialog__discover-search">
              <CdxSearchInput
                v-model="discoverSearchQuery"
                :placeholder="locale.cite.discoverPlaceholder"
              />
              <CdxButton weight="quiet" :aria-label="locale.cite.filter">
                <CdxIcon :icon="cdxIconFunnel" />
              </CdxButton>
            </div>
            <div class="cite-dialog__discover-list">
              <div
                v-for="ref in discoverReferences"
                :key="ref.id"
                class="cite-dialog__discover-item"
              >
                <div class="cite-dialog__discover-source">
                  <img
                    :src="ref.sourceThumbnailUrl"
                    :alt="ref.sourceTitle"
                    class="cite-dialog__discover-source-icon"
                  />
                  <span class="cite-dialog__discover-source-name">{{ ref.sourceTitle }}</span>
                </div>
                <p class="cite-dialog__discover-text">{{ ref.text }}</p>
                <div class="cite-dialog__discover-actions">
                  <CdxButton @click="onAddDiscoverReference(ref)">
                    <CdxIcon :icon="cdxIconAdd" />
                    {{ locale.cite.add }}
                  </CdxButton>
                  <CdxButton weight="quiet">
                    <CdxIcon :icon="cdxIconBook" />
                    {{ locale.cite.read }}
                  </CdxButton>
                </div>
              </div>
            </div>
          </div>
        </CdxTab>
      </CdxTabs>
    </CdxDialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CdxDialog, CdxTabs, CdxTab, CdxSearchInput, CdxButton, CdxIcon } from '@wikimedia/codex'
import { cdxIconLogoWikidata, cdxIconFunnel, cdxIconAdd, cdxIconBook } from '@wikimedia/codex-icons'
import { useCitationRegistry } from '@/composables/useCitationRegistry'
import { useTopicContent } from '@/composables/useTopicContent'
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  initialTab: {
    type: String,
    default: 'automatic',
  },
})

const emit = defineEmits(['update:open', 'citation-selected'])

const { usedCitations, availableCitations } = useCitationRegistry()
const { locale } = useLocale()
const { sources: referenceSources } = useTopicContent()

const open = defineModel('open', { type: Boolean, default: false })
const activeTab = ref(props.initialTab)
const searchQuery = ref('')
const reuseSearchQuery = ref('')
const discoverSearchQuery = ref('')

const discoverReferences = computed(() =>
  referenceSources.value.flatMap((source) =>
    source.references.map((ref) => ({
      ...ref,
      sourceId: source.id,
      sourceTitle: source.title,
      sourceThumbnailUrl: source.thumbnailUrl,
    })),
  ),
)

function onSelectCitation(citation) {
  emit('citation-selected', citation)
  open.value = false
}

function onAddDiscoverReference(discoverRef) {
  const citation = {
    id: discoverRef.id,
    segments: [{ text: discoverRef.text, style: 'normal' }],
  }
  emit('citation-selected', citation)
  open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) {
    activeTab.value = props.initialTab
  }
})
</script>

<style scoped>
.cite-dialog :deep(.cdx-dialog__header) {
  flex-direction: row-reverse;
  align-items: center;
  padding: var(--spacing-50) var(--spacing-100);
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
}

.cite-dialog :deep(.cdx-dialog__header__title) {
  font-size: var(--font-size-large);
}

.cite-dialog :deep(.cdx-dialog__header__close-button.cdx-button) {
  margin-right: var(--spacing-100);
}

.cite-dialog :deep(.cdx-dialog__body) {
  font-family: var(--font-family-system-sans);
  padding: 0;
}

.cite-dialog__tab-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
  padding: var(--spacing-100);
}

.cite-dialog__description {
  font-size: var(--font-size-medium);
  line-height: var(--line-height-medium);
  color: var(--color-base);
  margin: 0;
}

.cite-dialog__reuse {
  display: flex;
  flex-direction: column;
}

.cite-dialog__reuse-search {
  padding: var(--spacing-75) var(--spacing-100);
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
  /* box-shadow:
    0 4px 4px rgba(0, 0, 0, 0.06),
    0 0 8px rgba(0, 0, 0, 0.06); */
}

.cite-dialog__reuse-list {
  padding: var(--spacing-75) var(--spacing-100) var(--spacing-100);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
}

.cite-dialog__reuse-item {
  padding-bottom: var(--spacing-100);
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
  line-height: var(--line-height-small);
  color: var(--color-emphasized);
}

.cite-dialog__reuse-item--clickable {
  cursor: pointer;
  border-radius: var(--border-radius-base);
}

.cite-dialog__reuse-item--clickable:active {
  background-color: var(--background-color-interactive-subtle);
}

.cite-dialog__reuse-number {
  margin-right: var(--spacing-50);
}

.cite-dialog__reuse-text {
  flex: 1;
  min-width: 0;
}

.cite-dialog__reuse-link {
  color: var(--color-progressive);
  text-decoration: none;
  word-wrap: break-word;
}

.cite-dialog__reuse-link:hover {
  text-decoration: underline;
}

.cite-dialog__discover {
  display: flex;
  flex-direction: column;
}

.cite-dialog__discover-search {
  display: flex;
  align-items: center;
  gap: var(--spacing-50);
  padding: var(--spacing-75) var(--spacing-100);
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
}

.cite-dialog__discover-search .cdx-search-input {
  flex: 1;
}

.cite-dialog__discover-list {
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-100);
}

.cite-dialog__discover-item {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-75) 0 var(--spacing-100);
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
}

.cite-dialog__discover-item:last-child {
  border-bottom: none;
}

.cite-dialog__discover-source {
  display: flex;
  align-items: center;
  gap: var(--spacing-25);
  margin-bottom: var(--spacing-25);
}

.cite-dialog__discover-source-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.cite-dialog__discover-source-name {
  font-size: var(--font-size-small);
  line-height: var(--line-height-small);
  color: var(--color-progressive);
}

.cite-dialog__discover-text {
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.048px;
  color: var(--color-emphasized);
  margin: 0 0 var(--spacing-75) 0;
}

.cite-dialog__discover-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-50);
}

@media (min-width: 768px) {
  .cite-dialog {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .cite-dialog :deep(.cdx-dialog-backdrop) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 0 !important;
    pointer-events: auto !important;
  }

  .cite-dialog :deep(.cdx-dialog) {
    max-width: calc(100% - 2rem) !important;
    max-height: calc(100% - 2rem) !important;
    pointer-events: auto !important;
  }
}
</style>
