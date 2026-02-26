/**
 * Editor settings configuration
 * Defines the structure and default values for editor settings
 */

export const defaultSettings = {
  entryPoint: {
    style: 'quiet', // 'icon' | 'quiet' | 'text'
  },
  outline: {
    location: 'rail', // 'rail' | 'popover'
    persistence: 'close', // 'keep-open' | 'close'
  },
}

/**
 * Entry point style labels for display in the settings dialog
 */
export const entryPointLabels = {
  icon: 'Icon-only button',
  quiet: 'Animated label',
  text: 'Plain text',
}

export const outlineLocationLabels = {
  rail: 'Side panel',
  popover: 'Popover',
}

export const outlinePersistenceLabels = {
  'keep-open': 'Keep open after adding content',
  close: 'Close after adding content',
}
