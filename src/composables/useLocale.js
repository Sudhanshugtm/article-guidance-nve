// ABOUTME: Reactive locale composable that reads the `lang` query param.
// ABOUTME: Returns the matching UI locale bundle (falls back to English).

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import locales from '@/config/locales'

export function useLocale() {
  const route = useRoute()
  const lang = computed(() => {
    const requestedLang = typeof route.query.lang === 'string' ? route.query.lang : 'en'
    return locales[requestedLang] ? requestedLang : 'en'
  })
  const locale = computed(() => locales[lang.value] || locales.en)
  return { lang, locale }
}
