// ABOUTME: Guards publish-time add-reference strings for the supported research locales.
// ABOUTME: Keeps the new publish gate fully translated in English, Portuguese, and Turkish.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

for (const lang of ['en', 'pt', 'tr']) {
  test(`publish reference strings exist for ${lang}`, () => {
    const source = readFileSync(
      new URL(`../src/config/locales/${lang}.js`, import.meta.url),
      'utf8',
    )

    assert.match(source, /editChecks:\s*\{/)
    assert.match(source, /addReference:\s*\{/)
    assert.match(source, /title:/)
    assert.match(source, /description:/)
    assert.match(source, /addCitation:/)
    assert.match(source, /reject:/)
    assert.match(source, /reasonPrompt:/)
    assert.match(source, /reasonTitle:/)
    assert.match(source, /reasonDescription:/)
    assert.match(source, /back:/)
    assert.match(source, /submit:/)
    assert.match(source, /reasons:\s*\[/)
  })
}
