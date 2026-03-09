<!-- ABOUTME: Researcher hub page listing available prototype flows per language. -->
<!-- ABOUTME: Internal launch page with links to article lists and direct article entry points. -->

<script setup>
import { researchContent } from '@/config/researchContent'
import { getSupportedLanguages } from '@/utils/researchFlow'

const languages = getSupportedLanguages(researchContent).map((code) => researchContent[code])
</script>

<template>
  <div class="hub-page">
    <header class="hub-header">
      <h1 class="hub-title">Research prototype</h1>
      <p class="hub-subtitle">Select a language to start the article creation flow.</p>
    </header>

    <ul class="hub-list">
      <li v-for="lang in languages" :key="lang.code" class="hub-card-item">
        <router-link
          :to="{ name: 'articles', query: { lang: lang.code } }"
          class="hub-card"
        >
          <div class="hub-card-content">
            <span class="hub-card-label">{{ lang.label }}</span>
          </div>
          <div class="hub-card-actions">
            Open article list
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hub-page {
  padding: var(--spacing-100) var(--spacing-75);
  max-width: 480px;
  margin: 0 auto;
}

.hub-header {
  padding: var(--spacing-100) 0 var(--spacing-75);
}

.hub-title {
  font-size: var(--font-size-xx-large, 1.5rem);
  font-weight: var(--font-weight-bold, 700);
  margin: 0 0 var(--spacing-50);
  color: var(--color-base);
}

.hub-subtitle {
  font-size: var(--font-size-medium, 0.875rem);
  color: var(--color-subtle);
  margin: 0;
}

.hub-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-75);
}

.hub-card-item {
  list-style: none;
}

.hub-card {
  display: block;
  border: 1px solid var(--border-color-subtle);
  border-radius: var(--border-radius-base, 2px);
  padding: var(--spacing-75);
  background-color: var(--background-color-base);
  text-decoration: none;
  transition: background-color 160ms ease, border-color 160ms ease;
}

.hub-card:hover {
  background-color: var(--background-color-neutral-subtle);
}

.hub-card:focus-visible {
  outline: 2px solid var(--color-progressive);
  outline-offset: 2px;
}

.hub-card-content {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-50);
  margin-bottom: var(--spacing-75);
}

.hub-card-label {
  font-size: var(--font-size-large, 1.125rem);
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-base);
}

.hub-card-actions {
  font-size: var(--font-size-medium, 0.875rem);
  color: var(--color-progressive);
  font-weight: var(--font-weight-bold, 700);
}
</style>
