// ABOUTME: Provides the correct editor content configs based on the current route topic.
// ABOUTME: Returns coffee configs for research coffee topics, tiger configs as default.

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { articleSections } from '@/config/articleSections'
import { verifiedFacts } from '@/config/verifiedFacts'
import { citations } from '@/config/citations'
import { referenceSources } from '@/config/referenceSources'

import { coffeeSections } from '@/config/coffeeSections'
import { coffeeCitations } from '@/config/coffeeCitations'
import {
  getLocalizedCoffeeFacts,
  getLocalizedCoffeeReferenceSources,
} from '@/utils/topicContentLocalization'

const COFFEE_TOPIC_IDS = new Set(['coffee', 'kahve', 'cafe'])

export function useTopicContent() {
  const route = useRoute()
  const lang = computed(() =>
    Array.isArray(route.query.lang) ? route.query.lang[0] ?? 'en' : route.query.lang ?? 'en',
  )

  const isCoffeeTopic = computed(() => COFFEE_TOPIC_IDS.has(route.query.topic))

  const sections = computed(() => (isCoffeeTopic.value ? coffeeSections : articleSections))

  const facts = computed(() => (isCoffeeTopic.value ? getLocalizedCoffeeFacts(lang.value) : verifiedFacts))

  const topicCitations = computed(() => (isCoffeeTopic.value ? coffeeCitations : citations))

  const sources = computed(() =>
    isCoffeeTopic.value ? getLocalizedCoffeeReferenceSources(lang.value) : referenceSources,
  )

  return { isCoffeeTopic, sections, facts, topicCitations, sources }
}
