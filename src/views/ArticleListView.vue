<!-- ABOUTME: Article list page for a selected language in the research flow. -->
<!-- ABOUTME: Displays available staged articles with links to their reading pages. -->

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { researchContent } from '@/config/researchContent'
import { getArticlesForLanguage } from '@/utils/researchFlow'

const route = useRoute()
const articleListState = computed(() => getArticlesForLanguage(route.query.lang, researchContent))
</script>

<template>
  <div class="article-list-page">
    <header class="article-list-header">
      <router-link :to="{ name: 'hub' }" class="back-link">&larr; Back</router-link>
      <h1 class="article-list-title">{{ articleListState.language.label }}</h1>
      <p class="article-list-subtitle">Select an article to read.</p>
    </header>

    <ul class="article-list">
      <li
        v-for="article in articleListState.articles"
        :key="article.id"
        class="article-list-card"
      >
        <router-link
          :to="{
            name: 'article',
            query: { lang: articleListState.language.code, article: article.id },
          }"
          class="article-list-card-link"
        >
          <span class="article-list-card-title">{{ article.title }}</span>
          <span class="article-list-card-summary">{{ article.summary[0] }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.article-list-page {
  padding: var(--spacing-100) var(--spacing-75);
  max-width: 480px;
  margin: 0 auto;
}

.article-list-header {
  padding: var(--spacing-50) 0 var(--spacing-75);
}

.back-link {
  font-size: var(--font-size-small, 0.8125rem);
  color: var(--color-subtle);
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.article-list-title {
  font-size: var(--font-size-xx-large, 1.5rem);
  font-weight: var(--font-weight-bold, 700);
  margin: var(--spacing-50) 0 var(--spacing-25);
  color: var(--color-base);
}

.article-list-subtitle {
  font-size: var(--font-size-medium, 0.875rem);
  color: var(--color-subtle);
  margin: 0;
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-75);
}

.article-list-card {
  border: 1px solid var(--border-color-subtle);
  border-radius: var(--border-radius-base, 2px);
  background-color: var(--background-color-base);
  overflow: hidden;
}

.article-list-card-link {
  display: block;
  padding: var(--spacing-75);
  text-decoration: none;
  color: var(--color-base);
}

.article-list-card-link:hover {
  background-color: var(--background-color-neutral-subtle);
}

.article-list-card-title {
  display: block;
  font-size: var(--font-size-large, 1.125rem);
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-progressive);
  margin-bottom: var(--spacing-25);
}

.article-list-card-summary {
  display: block;
  font-size: var(--font-size-medium, 0.875rem);
  color: var(--color-subtle);
  line-height: var(--line-height-medium, 1.6);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
