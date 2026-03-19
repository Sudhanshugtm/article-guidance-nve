// ABOUTME: Guards multilingual edit-check card copy and localized tone-check keywords.
// ABOUTME: Ensures supported UI languages can both see and trigger non-reference edit checks.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import { buildPeacockPattern, getPeacockWords } from '../src/config/peacockWords.js'

const toneCardSource = readFileSync(
  new URL('../src/components/ReviseToneCard.vue', import.meta.url),
  'utf8',
)

const pastedCardSource = readFileSync(
  new URL('../src/components/PastedContentCard.vue', import.meta.url),
  'utf8',
)

const completeSectionCardSource = readFileSync(
  new URL('../src/components/CompleteSectionCard.vue', import.meta.url),
  'utf8',
)

for (const lang of ['en', 'pt', 'tr']) {
  test(`edit check locale strings exist for ${lang}`, () => {
    const localeSource = readFileSync(
      new URL(`../src/config/locales/${lang}.js`, import.meta.url),
      'utf8',
    )

    assert.match(localeSource, /editChecks:\s*\{/)
    assert.match(localeSource, /tone:\s*\{/)
    assert.match(localeSource, /title:/)
    assert.match(localeSource, /description:/)
    assert.match(localeSource, /learnMore:/)
    assert.match(localeSource, /revise:/)
    assert.match(localeSource, /decline:/)
    assert.match(localeSource, /identifiedUsing:/)
    assert.match(localeSource, /modelLabel:/)

    assert.match(localeSource, /pastedContent:\s*\{/)
    assert.match(localeSource, /descriptionPrefix:/)
    assert.match(localeSource, /descriptionLinkText:/)
    assert.match(localeSource, /descriptionSuffix:/)
    assert.match(localeSource, /question:/)
    assert.match(localeSource, /keep:/)
    assert.match(localeSource, /remove:/)

    assert.match(localeSource, /completeSection:\s*\{/)
    assert.match(localeSource, /confirm:/)
  })
}

test('non-reference edit check cards read from locale bundles instead of hardcoded English copy', () => {
  assert.match(toneCardSource, /useLocale/)
  assert.match(toneCardSource, /locale\.editChecks\.tone\.title/)
  assert.match(toneCardSource, /locale\.editChecks\.tone\.description/)
  assert.match(toneCardSource, /locale\.editChecks\.tone\.learnMore/)
  assert.match(toneCardSource, /locale\.editChecks\.tone\.revise/)
  assert.match(toneCardSource, /locale\.editChecks\.tone\.decline/)

  assert.match(pastedCardSource, /useLocale/)
  assert.match(pastedCardSource, /locale\.editChecks\.pastedContent\.title/)
  assert.match(pastedCardSource, /locale\.editChecks\.pastedContent\.question/)
  assert.match(pastedCardSource, /locale\.editChecks\.pastedContent\.keep/)
  assert.match(pastedCardSource, /locale\.editChecks\.pastedContent\.remove/)

  assert.match(completeSectionCardSource, /useLocale/)
  assert.match(completeSectionCardSource, /locale\.editChecks\.completeSection\.title/)
  assert.match(completeSectionCardSource, /locale\.editChecks\.completeSection\.description/)
  assert.match(completeSectionCardSource, /locale\.editChecks\.completeSection\.confirm/)
})

test('localized tone-check keywords support Portuguese, Turkish, and English fallback', () => {
  const enPattern = buildPeacockPattern(getPeacockWords('en'))
  const ptPattern = buildPeacockPattern(getPeacockWords('pt'))
  const trPattern = buildPeacockPattern(getPeacockWords('tr'))
  const fallbackWords = getPeacockWords('xx')

  assert.equal(enPattern.test('This is a famous drink.'), true)
  assert.equal(ptPattern.test('Este e um cafe famoso.'), true)
  assert.equal(trPattern.test('Bu unlu bir icecektir.'), true)
  assert.equal(trPattern.test('Bunun unlusunu anlatti.'), false)
  assert.deepEqual(fallbackWords, getPeacockWords('en'))
})
