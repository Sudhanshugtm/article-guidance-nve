<!-- ABOUTME: Fake Wikipedia article page using Minerva-style chrome. -->
<!-- ABOUTME: Fetches real content via fakewiki and includes a red link to the editor. -->

<template>
  <div class="reading">
    <header class="reading__header">
      <span class="reading__wordmark">Wikipedia</span>
    </header>

    <main class="reading__content">
      <article v-if="summary">
        <img
          v-if="summary.thumbnail?.source"
          class="reading__hero"
          :src="summary.thumbnail.source"
          :alt="summary.title ?? ''"
        />
        <div class="reading__body">
          <h1 class="reading__title">{{ summary.title }}</h1>
          <div
            v-if="summary.extract_html"
            class="reading__extract"
            v-html="summary.extract_html"
          />

          <h2 class="reading__section-heading">Notable parks</h2>
          <ul class="reading__list">
            <li v-for="item in listItems" :key="item.title">
              <a
                v-if="item.exists"
                :href="item.url"
                class="reading__link"
              >{{ item.title }}</a>
              <router-link
                v-else
                :to="{ name: 'editor', query: { lang: lang } }"
                class="reading__link reading__link--red"
              >{{ item.title }}</router-link>
            </li>
          </ul>
        </div>
      </article>

      <div v-else-if="error" class="reading__message">
        Could not load article.
      </div>

      <div v-else class="reading__message reading__message--loading">
        Loading...
      </div>
    </main>

    <footer class="reading__footer">
      <span>Content from Wikipedia, the free encyclopedia</span>
    </footer>
  </div>
</template>

<script setup>
// ABOUTME: Fetches a real Wikipedia article via fakewiki and renders it
// ABOUTME: with a Minerva-style shell. One list item is a red link to the editor.

import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FakeWiki } from 'fakewiki'

const route = useRoute()
const lang = computed(() => route.query.lang || 'en')

const summary = ref(null)
const error = ref(false)

const articleTitle = 'National parks of India'

const listItems = [
  { title: 'Jim Corbett National Park', exists: true, url: 'https://en.wikipedia.org/wiki/Jim_Corbett_National_Park' },
  { title: 'Kaziranga National Park', exists: true, url: 'https://en.wikipedia.org/wiki/Kaziranga_National_Park' },
  { title: 'Ranthambore National Park', exists: true, url: 'https://en.wikipedia.org/wiki/Ranthambore_National_Park' },
  { title: 'Sessa Orchid Sanctuary', exists: false, url: null },
  { title: 'Periyar National Park', exists: true, url: 'https://en.wikipedia.org/wiki/Periyar_National_Park' },
]

onMounted(async () => {
  const wiki = new FakeWiki()
  try {
    summary.value = await wiki.getPageSummary(articleTitle)
  } catch (e) {
    error.value = true
  }
})
</script>

<style scoped>
.reading {
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color-base);
}

/* Minerva-style header bar */
.reading__header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 16px;
  background-color: var(--background-color-base);
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
}

.reading__wordmark {
  font-family: 'Linux Libertine', 'Georgia', 'Times', serif;
  font-size: 1.3rem;
  color: var(--color-base);
}

/* Content area with Minerva spacing and typography */
.reading__content {
  flex: 1;
  font-family: var(--font-family-system-sans);
  line-height: 1.65;
  font-size: var(--font-size-medium);
  color: var(--color-base);
}

.reading__hero {
  display: block;
  width: 100%;
  height: auto;
}

.reading__body {
  padding: 0 16px 16px;
}

.reading__title {
  font-family: 'Linux Libertine', 'Georgia', 'Times', serif;
  font-size: 1.7rem;
  font-weight: normal;
  line-height: 1.25;
  margin: 16px 0 8px;
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
  padding-bottom: 8px;
}

.reading__extract {
  margin-bottom: 16px;
}

.reading__extract :deep(p) {
  margin: 0 0 8px;
}

.reading__section-heading {
  font-family: var(--font-family-system-sans);
  font-size: 1.1rem;
  font-weight: var(--font-weight-bold);
  border-bottom: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
  padding-bottom: 4px;
  margin: 24px 0 12px;
}

.reading__list {
  padding-left: 24px;
  margin: 0;
}

.reading__list li {
  margin-bottom: 6px;
}

.reading__link {
  color: var(--color-progressive);
  text-decoration: none;
}

.reading__link:hover {
  text-decoration: underline;
}

.reading__link--red {
  color: var(--color-destructive);
}

.reading__message {
  padding: 32px 16px;
  color: var(--color-subtle);
  text-align: center;
}

/* Minerva-style footer */
.reading__footer {
  padding: 16px;
  border-top: var(--border-width-base) var(--border-style-base) var(--border-color-subtle);
  font-size: var(--font-size-small);
  color: var(--color-subtle);
  text-align: center;
}
</style>
