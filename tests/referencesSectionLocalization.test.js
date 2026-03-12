// ABOUTME: Prevents the editor references heading from being hard-coded in English.
// ABOUTME: Ensures the visible heading comes from the active locale bundle.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('references section heading reads from the locale bundle', async () => {
  const source = await readFile(
    new URL('../src/components/ReferencesSectionView.vue', import.meta.url),
    'utf8',
  )

  assert.match(source, /useLocale/)
  assert.match(source, /locale\.rail\.references/)
  assert.doesNotMatch(source, /<h2 class="references-heading">References<\/h2>/)
})
