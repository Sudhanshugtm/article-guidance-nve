// ABOUTME: Route definitions for the research entry flow screens.
// ABOUTME: Maps path names to view components for hub, article list, reading page, and editor.

export const routeConfig = [
  { path: '/', name: 'hub', view: 'HubView' },
  { path: '/articles', name: 'articles', view: 'ArticleListView' },
  { path: '/article', name: 'article', view: 'ReadingView' },
  { path: '/editor', name: 'editor', view: 'EditorView' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
