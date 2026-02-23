import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defaultSettings } from '../config/editorSettings'

/**
 * Composable for managing editor settings synchronized with URL query parameters
 * Settings are encoded as query params: ?entryPoint-icon=templateAdd
 */
export function useEditorSettings() {
  const route = useRoute()
  const router = useRouter()

  /**
   * Parse URL query parameters into settings object
   * Falls back to defaultSettings for missing or invalid values
   */
  const settings = computed(() => {
    const parsed = structuredClone(defaultSettings)

    for (const [key, value] of Object.entries(route.query)) {
      const entryPointMatch = key.match(/^entryPoint-(\w+)$/)
      if (entryPointMatch) {
        const settingName = entryPointMatch[1]
        if (settingName in parsed.entryPoint) {
          parsed.entryPoint[settingName] = value
        }
      }

      const outlineMatch = key.match(/^outline-(\w+)$/)
      if (outlineMatch) {
        const settingName = outlineMatch[1]
        if (settingName in parsed.outline) {
          parsed.outline[settingName] = value
        }
      }
    }

    return parsed
  })

  /**
   * Serialize settings object to URL query parameters
   * Only writes values that differ from defaults
   */
  function serializeToQuery(settings) {
    const query = {}

    for (const [settingName, value] of Object.entries(settings.entryPoint)) {
      if (value !== defaultSettings.entryPoint[settingName]) {
        query[`entryPoint-${settingName}`] = value
      }
    }

    for (const [settingName, value] of Object.entries(settings.outline)) {
      if (value !== defaultSettings.outline[settingName]) {
        query[`outline-${settingName}`] = value
      }
    }

    return query
  }

  /**
   * Update settings and sync to URL
   * Preserves other query params
   */
  function updateSettings(newSettings) {
    const settingsQuery = serializeToQuery(newSettings)

    // Preserve non-settings query params
    const preservedQuery = {}
    for (const [key, value] of Object.entries(route.query)) {
      if (!key.match(/^(entryPoint|outline)-\w+$/)) {
        preservedQuery[key] = value
      }
    }

    router.replace({ query: { ...preservedQuery, ...settingsQuery } })
  }

  return { settings, updateSettings }
}
