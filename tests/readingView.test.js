// ABOUTME: Guards the research reading view structure.
// ABOUTME: Keeps the desktop/mobile reader free of Wikipedia footer chrome.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readingViewSource = readFileSync(
  new URL('../src/views/ReadingView.vue', import.meta.url),
  'utf8',
)

test('reading view does not render the staged Wikipedia footer chrome', () => {
  assert.doesNotMatch(readingViewSource, /<footer class="wiki-footer">/)
  assert.doesNotMatch(readingViewSource, /\.wiki-footer \{/)
})
