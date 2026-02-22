/**
 * Editor settings configuration
 * Defines the structure and default values for editor settings
 */

import { cdxIconAdd, cdxIconTemplateAdd } from '@wikimedia/codex-icons'

export const defaultSettings = {
  entryPoint: {
    icon: 'add', // 'add' | 'templateAdd'
  },
}

/**
 * Entry point icon labels for display in the settings dialog
 */
export const entryPointLabels = {
  add: 'Add',
  templateAdd: 'Template add',
}

/**
 * Maps setting string keys to actual icon objects
 */
export const entryPointIcons = {
  add: cdxIconAdd,
  templateAdd: cdxIconTemplateAdd,
}
