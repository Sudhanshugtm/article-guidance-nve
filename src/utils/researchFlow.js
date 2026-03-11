// ABOUTME: Pure helpers for resolving research flow state from local config.
// ABOUTME: Used by hub, article list, reading page, and editor handoff routes.

export function getSupportedLanguages(content) {
  return Object.keys(content)
}

export function getArticlesForLanguage(lang, content) {
  const language = content[lang] ?? content[Object.keys(content)[0]]
  return { language, articles: language.articles }
}

export function getArticleForRoute(query, content) {
  const { articles } = getArticlesForLanguage(query.lang, content)
  return articles.find((article) => article.id === query.article) ?? articles[0]
}

export function getTopicForRoute(query, content) {
  const article = getArticleForRoute(query, content)
  return article.redLinks.find((topic) => topic.id === query.topic) ?? article.redLinks[0]
}

export function buildEditorQuery({ lang, articleId, topicId }) {
  return { lang, article: articleId, topic: topicId }
}

export function flattenParagraph(para, redLinks) {
  if (typeof para === 'string') return para
  return para
    .map((seg) => (typeof seg === 'string' ? seg : redLinks?.[seg.redLinkIndex]?.label ?? ''))
    .join('')
}
