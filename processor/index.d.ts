import type { ReadonlySignal } from '@preact/signals-core'

import type {
  TranslationFunction,
  TranslationJSON
} from '../create-i18n/index.js'

export interface Processor<Key extends string = string> {
  from: ReadonlySignal<Key>
  <Input extends Record<Key, TranslationJSON>>(
    input: Input
  ): TranslationFunction<[], Input[keyof Input]>
}

/**
 * Create processor with store to listen for changes
 * and re-render translations.
 *
 * ```ts
 * import { createProcessor, createI18n } from '@nanostores/i18n'
 * import { signal } from '@preact/signals-core'
 * import { i18n } from '../stores/i18n'
 *
 * const sizeStore = signal('big')
 * export const size = createProcessor(sizeStore)
 * export const i18n = createI18n(locale, {
 *  get: async () => ({}),
 *  processors: [
 *   size
 *  ]
 * })
 *
 * export const messages = i18n('pagination', {
 *   title: size({
 *     big: 'Send message',
 *     small: 'send'
 *   })
 * })
 * ```
 *
 * ```js
 * t.title()
 * ```
 *
 * @param source Signal to listen to.
 * @returns The processor object.
 */
export function createProcessor<Key extends string>(
  source: ReadonlySignal<Key>
): Processor<Key>
