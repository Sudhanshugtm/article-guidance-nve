// ABOUTME: Guards the desktop prototype shell structure and overflow behavior.
// ABOUTME: Keeps the rounded card separate from the scrolling viewport.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const appShellSource = readFileSync(new URL('../src/App.vue', import.meta.url), 'utf8')
const globalStylesSource = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8')

test('desktop app shell uses a separate scrolling viewport inside the rounded frame', () => {
  assert.match(appShellSource, /<div class="app-shell__viewport">\s*<router-view \/>\s*<\/div>/)
  assert.match(appShellSource, /@media \(min-width: 768px\) \{[\s\S]*\.app-shell \{[\s\S]*overflow:\s*hidden;/)
  assert.match(appShellSource, /\.app-shell__viewport \{[\s\S]*overflow-y:\s*auto;/)
  assert.match(appShellSource, /\.app-shell__viewport \{[\s\S]*scrollbar-width:\s*none;/)
})

test('desktop document scroll is suppressed so only the prototype viewport scrolls', () => {
  assert.match(
    globalStylesSource,
    /@media \(min-width: 768px\) \{[\s\S]*html,\s*body,\s*#app \{[\s\S]*overflow:\s*hidden;/,
  )
})
