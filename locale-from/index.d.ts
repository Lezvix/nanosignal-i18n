import type { Signal, ReadonlySignal } from '@preact/signals-core'

export type LocaleStore<Locale extends string = string> = ReadonlySignal<Locale>

/**
 * Choose the first available locale from difference sources. Like use locale
 * from `localStorage` setting and browser’s locale if previous one is missing.
 *
 * ```ts
 * import { localeFrom, browser } from '@nanostores/i18n'
 * import { signal } from '@preact/signals-core'
 *
 * export const localeSettings = signal<'ru' | 'en' | undefined>(undefined)
 *
 * export const locale = localeFrom(
 *   localeSettings,
 *   browser({ available: ['ru', 'en'] as const })
 * )
 * ```
 *
 * @param stores Stores of different source of locale
 * @returns Store with the first non-`undefined` value from input stores
 */
export function localeFrom<Locale extends string>(
  ...stores: [...Signal<Locale | undefined>[], Signal<Locale>]
): LocaleStore<Locale>
