// ABOUTME: Guards the red link drawer structure and reading view integration.
// ABOUTME: Ensures the MobileFrontend-style bottom drawer exists between red link click and editor.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const overlaySource = readFileSync(
  new URL('../src/components/EditorLoadingOverlay.vue', import.meta.url),
  'utf8',
)

const readingViewSource = readFileSync(
  new URL('../src/views/ReadingView.vue', import.meta.url),
  'utf8',
)

const enLocaleSource = readFileSync(
  new URL('../src/config/locales/en.js', import.meta.url),
  'utf8',
)

const ptLocaleSource = readFileSync(
  new URL('../src/config/locales/pt.js', import.meta.url),
  'utf8',
)

const trLocaleSource = readFileSync(
  new URL('../src/config/locales/tr.js', import.meta.url),
  'utf8',
)

test('overlay component uses the MobileFrontend drawer pattern', () => {
  assert.match(overlaySource, /drawer-container__drawer/)
  assert.match(overlaySource, /drawer-container__mask/)
})

test('drawer has the "page not yet created" message binding', () => {
  assert.match(overlaySource, /redlinkExplain/)
})

test('drawer has a Create page button', () => {
  assert.match(overlaySource, /redlinkCreate/)
  assert.match(overlaySource, /onCreatePage/)
})

test('drawer has a dismiss/cancel link', () => {
  assert.match(overlaySource, /redlinkLeave/)
  assert.match(overlaySource, /onCancel/)
})

test('drawer slides up via visible class toggle', () => {
  assert.match(overlaySource, /\.visible/)
  assert.match(overlaySource, /isVisible/)
})

test('reading view imports and uses the overlay instead of direct router-link for red links', () => {
  assert.match(readingViewSource, /EditorLoadingOverlay/)
  assert.match(readingViewSource, /handleRedLinkClick/)
})

test('reading view no longer uses router-link for red links', () => {
  assert.doesNotMatch(readingViewSource, /<router-link[^>]*class="wiki-red-link"/)
})

test('en locale has red link drawer strings', () => {
  assert.match(enLocaleSource, /redlinkExplain/)
  assert.match(enLocaleSource, /redlinkCreate/)
  assert.match(enLocaleSource, /redlinkLeave/)
})

test('pt and tr locales have red link drawer strings', () => {
  assert.match(ptLocaleSource, /redlinkExplain/)
  assert.match(ptLocaleSource, /redlinkCreate/)
  assert.match(ptLocaleSource, /redlinkLeave/)
  assert.match(trLocaleSource, /redlinkExplain/)
  assert.match(trLocaleSource, /redlinkCreate/)
  assert.match(trLocaleSource, /redlinkLeave/)
})

test('desktop overlay is constrained to the centered prototype shell', () => {
  assert.match(
    overlaySource,
    /@media \(min-width: 768px\) \{[\s\S]*\.editor-loading-overlay \{[\s\S]*left:\s*var\(--editor-shell-offset\);[\s\S]*width:\s*var\(--editor-shell-width\);/,
  )
})
