<!-- ABOUTME: Staged Wikipedia-like reading page for the research entry flow. -->
<!-- ABOUTME: Renders article content with red links that hand off into the editor. -->

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { researchContent } from '@/config/researchContent'
import { getArticleForRoute, buildEditorQuery } from '@/utils/researchFlow'
import { useLocale } from '@/composables/useLocale'

const route = useRoute()
const lang = computed(() => route.query.lang ?? 'en')
const article = computed(() => getArticleForRoute(route.query, researchContent))
const { locale } = useLocale()
</script>

<template>
  <div class="reading-page">
    <!-- Wikipedia mobile header chrome -->
    <header class="wiki-header">
      <button class="wiki-header-btn wiki-header-btn--menu" :aria-label="locale.reading.mainMenu" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M1 3h18v2H1zm0 6h18v2H1zm0 6h18v2H1z" fill="currentColor" />
        </svg>
      </button>

      <router-link :to="{ name: 'articles', query: { lang: lang } }" class="wiki-brand-link">
        <img
          class="wiki-brand-wordmark"
          :src="locale.reading.wordmarkUrl"
          :alt="locale.reading.wordmarkAlt"
        />
      </router-link>

      <button class="wiki-header-btn wiki-header-btn--search" :aria-label="locale.reading.search" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M12.2 13.6a7 7 0 1 1 1.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1 0 10 0A5 5 0 0 0 3 8"
            fill="currentColor"
          />
        </svg>
      </button>
    </header>

    <section class="wiki-title-block">
      <h1 class="wiki-title">{{ article.title }}</h1>

      <!-- "From Wikipedia, the free encyclopedia" tagline -->
      <div class="wiki-tagline">{{ locale.reading.tagline }}</div>
    </section>

    <!-- Article/Talk tabs bar -->
    <nav class="wiki-tabs-bar" aria-label="Associated pages">
      <ul class="wiki-tabs-list">
        <li class="wiki-tab wiki-tab--selected">
          <span class="wiki-tab-text">{{ locale.reading.articleTab }}</span>
        </li>
        <li class="wiki-tab">
          <span class="wiki-tab-text">{{ locale.reading.talkTab }}</span>
        </li>
      </ul>
    </nav>

    <!-- Article content -->
    <main class="wiki-body">

      <div class="wiki-lead">
        <p v-for="(para, i) in article.summary" :key="'s' + i" class="wiki-paragraph">
          <!-- Plain string paragraph -->
          <template v-if="typeof para === 'string'">{{ para }}</template>
          <!-- Segment paragraph: strings interleaved with inline links -->
          <template v-else v-for="(seg, segi) in para" :key="'sseg' + i + '-' + segi">
            <template v-if="typeof seg === 'string'">{{ seg }}</template>
            <a v-else-if="seg.blueLink" class="wiki-blue-link" @click.prevent>{{ seg.blueLink }}</a>
            <router-link
              v-else
              :to="{
                name: 'editor',
                query:
                  buildEditorQuery({
                    lang: lang,
                    articleId: article.id,
                    topicId: article.redLinks[seg.redLinkIndex].id,
                  }),
              }"
              class="wiki-red-link"
            >{{ article.redLinks[seg.redLinkIndex].label }}</router-link>
          </template>
        </p>
      </div>

      <div v-for="(section, si) in article.sections" :key="'sec' + si" class="wiki-section">
        <div class="wiki-heading-wrapper">
          <h2 class="wiki-heading">{{ section.heading }}</h2>
        </div>
        <p
          v-for="(para, pi) in section.paragraphs"
          :key="'p' + si + '-' + pi"
          class="wiki-paragraph"
        >
          <!-- Plain string paragraph -->
          <template v-if="typeof para === 'string'">{{ para }}</template>
          <!-- Segment paragraph: strings interleaved with inline links -->
          <template v-else v-for="(seg, segi) in para" :key="'seg' + si + '-' + pi + '-' + segi">
            <template v-if="typeof seg === 'string'">{{ seg }}</template>
            <a v-else-if="seg.blueLink" class="wiki-blue-link" @click.prevent>{{ seg.blueLink }}</a>
            <router-link
              v-else
              :to="{
                name: 'editor',
                query:
                  buildEditorQuery({
                    lang: lang,
                    articleId: article.id,
                    topicId: article.redLinks[seg.redLinkIndex].id,
                  }),
              }"
              class="wiki-red-link"
            >{{ article.redLinks[seg.redLinkIndex].label }}</router-link>
          </template>
        </p>
      </div>
    </main>

  </div>
</template>

<style scoped>
.reading-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: var(--background-color-base);
}

/* Wikipedia mobile header chrome */
.wiki-header {
  display: flex;
  align-items: center;
  gap: 2px;
  min-height: 3.5rem;
  padding: 0 10px 0 6px;
  background-color: #eaecf0;
  border-bottom: 1px solid #c8ccd1;
}

.wiki-header-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  border-radius: 2px;
  background: transparent;
  color: #202122;
  cursor: pointer;
}

.wiki-header-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.wiki-header-btn--menu {
  margin-right: 4px;
}

.wiki-brand-link {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  text-decoration: none;
}

.wiki-brand-wordmark {
  width: auto;
  height: 1.05rem;
  display: block;
  opacity: 0.66;
}

/* Article/Talk namespace tabs — matches Vector 2022 tab bar */
.wiki-tabs-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  border-bottom: 1px solid #c8ccd1;
}

.wiki-tabs-list {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.wiki-tab {
  display: flex;
  align-items: center;
  padding: 0 0 6px;
  color: #54595d;
  border-bottom: 2px solid transparent;
}

.wiki-tab--selected {
  border-bottom-color: #54595d;
}

.wiki-tab-text {
  display: block;
  font-family: sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.4;
  color: inherit;
}

/* Article body — matches Wikipedia content area */
.wiki-title-block {
  padding: 20px 16px 0;
}

.wiki-body {
  flex: 1;
  padding: 8px 16px 24px;
  width: 100%;
  box-sizing: border-box;
}

.wiki-title {
  font-family: 'Linux Libertine', Georgia, Times, 'Source Serif 4', serif;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.375;
  margin: 0;
  color: var(--color-base);
}

.wiki-tagline {
  font-size: 0.875rem;
  color: var(--color-base);
  margin: 4px 0 var(--spacing-100);
}

.wiki-lead {
  margin-bottom: var(--spacing-150);
}

.wiki-paragraph {
  font-family: var(--font-family-system-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.65;
  color: #202122;
  margin: 8px 0 0;
}

.wiki-section {
  margin-bottom: var(--spacing-150);
}

.wiki-heading-wrapper {
  border-bottom: 1px solid var(--border-color-base);
  margin: 6px 0 var(--spacing-75);
  padding-bottom: 4px;
}

.wiki-heading {
  font-family: 'Linux Libertine', Georgia, Times, 'Source Serif 4', serif;
  font-size: var(--font-size-xx-large);
  font-weight: 400;
  color: var(--color-base);
  margin: 0;
}

/* Blue links — decorative Wikipedia-style wikilinks that don't navigate */
.wiki-blue-link {
  color: var(--color-progressive);
  text-decoration: none;
  cursor: pointer;
}

.wiki-blue-link:hover {
  text-decoration: underline;
}

/* Red links — matches Wikipedia's red link color */
.wiki-red-link {
  color: var(--color-link-red);
  text-decoration: none;
}

.wiki-red-link:hover {
  color: var(--color-link-red--hover);
  text-decoration: underline;
}

.wiki-red-link:active {
  color: var(--color-link-red--active);
}

.wiki-red-link:visited {
  color: var(--color-link-red--visited);
}
</style>
