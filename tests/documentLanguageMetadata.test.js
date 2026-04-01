// ABOUTME: Guards the document language metadata used by Chrome translation detection.
// ABOUTME: Ensures the app shell reflects the active locale instead of advertising English.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const appSource = readFileSync(new URL('../src/App.vue', import.meta.url), 'utf8')
const useLocaleSource = readFileSync(
  new URL('../src/composables/useLocale.js', import.meta.url),
  'utf8',
)

test('app shell syncs the document language metadata from the active locale', () => {
  assert.match(appSource, /useLocale\(\)/)
  assert.match(appSource, /document\.documentElement\.lang\s*=\s*lang\.value/)
  assert.match(appSource, /document\.documentElement\.dir\s*=\s*['"]ltr['"]/)
})

test('locale composable normalizes unsupported query languages to english', () => {
  assert.match(
    useLocaleSource,
    /const requestedLang = typeof route\.query\.lang === ['"]string['"] \? route\.query\.lang : ['"]en['"]/,
  )
  assert.match(useLocaleSource, /return locales\[requestedLang\] \? requestedLang : ['"]en['"]/)
})
