// ABOUTME: Verifies coffee verified facts and reference-source cards localize for Portuguese.
// ABOUTME: Guards English fallback when a locale-specific translation is unavailable.

import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getLocalizedCoffeeFacts,
  getLocalizedCoffeeReferenceSources,
} from '../src/utils/topicContentLocalization.js'

test('Portuguese coffee verified facts localize research card copy', () => {
  const facts = getLocalizedCoffeeFacts('pt')

  const dailyConsumers = facts.find((fact) => fact.id === 'daily-consumers')
  const topProducer = facts.find((fact) => fact.id === 'top-producer')

  assert.equal(dailyConsumers?.title, '2 mil milhões')
  assert.equal(
    dailyConsumers?.description,
    'consumidores diários estimados em todo o mundo',
  )
  assert.equal(topProducer?.title, 'Brasil')
  assert.equal(topProducer?.description, 'principal país produtor')
})

test('Portuguese coffee reference sources localize project labels and discover text', () => {
  const sources = getLocalizedCoffeeReferenceSources('pt')

  const commons = sources.find((source) => source.id === 'commons')
  const wiktionary = sources.find((source) => source.id === 'wiktionary')

  assert.equal(commons?.description, 'Coleção de multimédia livre')
  assert.match(
    commons?.references.find((reference) => reference.id === 'ico-history')?.text ?? '',
    /^Organização Internacional do Café\./,
  )
  assert.equal(wiktionary?.title, 'Wikcionário')
})

test('Turkish coffee verified facts localize research card copy', () => {
  const facts = getLocalizedCoffeeFacts('tr')

  const dailyConsumers = facts.find((fact) => fact.id === 'daily-consumers')
  const topProducer = facts.find((fact) => fact.id === 'top-producer')

  assert.equal(dailyConsumers?.title, '2 milyar')
  assert.equal(dailyConsumers?.description, 'dünya genelinde tahmini günlük tüketici sayısı')
  assert.equal(topProducer?.title, 'Brezilya')
  assert.equal(topProducer?.description, 'en büyük üretici ülke')
})

test('Turkish coffee reference sources localize project labels and discover text', () => {
  const sources = getLocalizedCoffeeReferenceSources('tr')

  const commons = sources.find((source) => source.id === 'commons')
  const wikidata = sources.find((source) => source.id === 'wikidata')
  const wiktionary = sources.find((source) => source.id === 'wiktionary')

  assert.equal(commons?.description, 'Ücretsiz medya koleksiyonu')
  assert.match(
    commons?.references.find((reference) => reference.id === 'ico-history')?.text ?? '',
    /^Uluslararası Kahve Organizasyonu\./,
  )
  assert.equal(wikidata?.title, 'Vikiveri')
  assert.equal(wiktionary?.title, 'Vikisözlük')
})

test('coffee topic localization falls back to English for unsupported languages', () => {
  const facts = getLocalizedCoffeeFacts('xx')
  const sources = getLocalizedCoffeeReferenceSources('xx')

  assert.equal(
    facts.find((fact) => fact.id === 'daily-consumers')?.description,
    'estimated daily consumers worldwide',
  )
  assert.equal(
    sources.find((source) => source.id === 'commons')?.description,
    'Free media collection',
  )
})
