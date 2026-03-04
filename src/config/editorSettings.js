/**
 * Editor settings configuration
 * Defines the structure and default values for editor settings
 */

export const defaultSettings = {
  entryPoint: {
    style: 'inline', // 'inline' | 'icon' | 'quiet' | 'text' | 'floating' | 'force'
    autoFocus: 'true', // 'true' | 'false'
  },
  outline: {
    location: 'rail', // 'rail' | 'popover'
    persistence: 'close', // 'keep-open' | 'close'
  },
  placeholder: {
    cursorBehavior: 'after', // 'after' | 'select'
  },
}

/**
 * Entry point style labels for display in the settings dialog
 */
export const entryPointLabels = {
  inline: 'Inline placeholder',
  icon: 'Icon-only button',
  quiet: 'Animated label',
  text: 'Inline placeholder (tap to open)',
  floating: 'Floating placeholder',
  force: 'Rail button',
}

export const autoFocusLabels = {
  true: 'Focus editor on launch',
  false: "Don't focus on launch",
}

export const outlineLocationLabels = {
  rail: 'Side panel',
  popover: 'Popover',
}

export const outlinePersistenceLabels = {
  'keep-open': 'Keep open after adding content',
  close: 'Close after adding content',
}

export const placeholderCursorLabels = {
  after: 'Place cursor after placeholder on tap',
  select: 'Select placeholder on tap',
}
