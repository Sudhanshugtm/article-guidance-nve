// ABOUTME: Guards Turkish reviewer wording changes in coffee article localization.
// ABOUTME: Keeps the accepted sentence-level fixes from regressing.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Turkish coffee history copy uses modern spelling in spread paragraph', () => {
  const source = readFileSync(
    new URL('../src/config/locales/tr.js', import.meta.url),
    'utf8',
  )

  assert.match(source, /haline geldi/)
  assert.doesNotMatch(source, /hâline geldi/)
})
