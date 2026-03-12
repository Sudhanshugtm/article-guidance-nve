// ABOUTME: Localizes topic-specific fact and source card content by active UI language.
// ABOUTME: Currently provides Portuguese overrides for the Coffee research prototype.

import { coffeeVerifiedFacts } from '../config/coffeeVerifiedFacts.js'
import { coffeeReferenceSources } from '../config/coffeeReferenceSources.js'

function stripLocales(entry) {
  const { locales, ...rest } = entry
  return rest
}

export function getLocalizedCoffeeFacts(lang) {
  return coffeeVerifiedFacts.map((fact) => {
    const localized = fact.locales?.[lang] ?? null

    return {
      ...stripLocales(fact),
      ...(localized ?? {}),
    }
  })
}

export function getLocalizedCoffeeReferenceSources(lang) {
  return coffeeReferenceSources.map((source) => {
    const localized = source.locales?.[lang] ?? null
    const localizedReferenceText = localized?.references ?? {}
    const references = source.references.map((reference) => ({
      ...reference,
      text: localizedReferenceText[reference.id] ?? reference.text,
    }))

    return {
      ...stripLocales(source),
      ...(localized ?? {}),
      references,
    }
  })
}
