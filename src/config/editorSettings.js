/**
 * Editor settings configuration
 * Defines the structure and default values for editor settings
 */

export const defaultSettings = {
  entryPoint: {
    style: 'icon', // 'icon' | 'quiet' | 'text'
  },
  outline: {
    location: 'rail', // 'rail' | 'popover'
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
