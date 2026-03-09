// ABOUTME: Tests for research flow content model and lookup helpers.
// ABOUTME: Validates language support, article resolution, topic fallback, and editor query building.

import test from 'node:test'
import assert from 'node:assert/strict'

import { researchContent } from '../src/config/researchContent.js'
import {
  getSupportedLanguages,
  getArticlesForLanguage,
  getArticleForRoute,
  getTopicForRoute,
  buildEditorQuery,
} from '../src/utils/researchFlow.js'

test('supported languages include en, tr, and pt', () => {
  assert.deepEqual(getSupportedLanguages(researchContent), ['en', 'tr', 'pt'])
})

test('invalid language falls back to the first configured article set', () => {
  const { language, articles } = getArticlesForLanguage('xx', researchContent)
  assert.equal(language.code, 'en')
  assert.equal(articles.length, 1)
})

test('article lookup returns a staged article with 2-3 red links', () => {
  const article = getArticleForRoute({ lang: 'en', article: 'assam-wetlands' }, researchContent)
  assert.equal(article.id, 'assam-wetlands')
  assert.equal(article.redLinks.length, 3)
})

test('hub data exposes one card per language', () => {
  assert.equal(getSupportedLanguages(researchContent).length, 3)
})

test('article list data remains expandable even with one article configured', () => {
  const { articles } = getArticlesForLanguage('tr', researchContent)
  assert.equal(Array.isArray(articles), true)
  assert.equal(articles.length, 1)
})

test('invalid article ids fall back to the first staged article', () => {
  const article = getArticleForRoute({ lang: 'tr', article: 'missing-article' }, researchContent)
  assert.equal(article, researchContent.tr.articles[0])
})

test('topic lookup falls back to the first configured red link', () => {
  const topic = getTopicForRoute(
    { lang: 'en', article: 'assam-wetlands', topic: 'missing-topic' },
    researchContent,
  )
  assert.equal(topic.id, 'dehing-patkai-national-park')
})

test('each staged article has lead content and sections', () => {
  const article = getArticleForRoute({ lang: 'pt', article: 'amazonia-reserves' }, researchContent)
  assert.equal(article.summary.length > 0, true)
  assert.equal(article.sections.length >= 2, true)
})

test('red links are placed inline via segment paragraphs', () => {
  const article = getArticleForRoute({ lang: 'en', article: 'assam-wetlands' }, researchContent)
  const hasSegmentParagraph = article.sections.some((section) =>
    section.paragraphs.some(
      (para) =>
        Array.isArray(para) && para.some((seg) => typeof seg === 'object' && 'redLinkIndex' in seg),
    ),
  )
  assert.equal(hasSegmentParagraph, true)
})

test('editor query is built from language, article, and topic ids', () => {
  assert.deepEqual(
    buildEditorQuery({ lang: 'pt', articleId: 'amazonia-reserves', topicId: 'jau-national-park' }),
    { lang: 'pt', article: 'amazonia-reserves', topic: 'jau-national-park' },
  )
})
