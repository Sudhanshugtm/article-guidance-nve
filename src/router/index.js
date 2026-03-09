// ABOUTME: Vue Router instance with lazy-loaded views for the research entry flow.
// ABOUTME: Resolves routeConfig view names to dynamic imports for code-splitting.

import { createRouter, createWebHistory } from 'vue-router'
import { routeConfig } from './routeConfig'

const viewModules = {
  HubView: () => import('../views/HubView.vue'),
  ArticleListView: () => import('../views/ArticleListView.vue'),
  ReadingView: () => import('../views/ReadingView.vue'),
  EditorView: () => import('../views/EditorView.vue'),
}

const routes = routeConfig.map((route) => {
  if (route.redirect) {
    return { path: route.path, redirect: route.redirect }
  }
  return {
    path: route.path,
    name: route.name,
    component: viewModules[route.view],
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
