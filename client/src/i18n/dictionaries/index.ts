import type { Locale } from '../config'
import type { Dictionary } from './dictionary'
import en from './en'
import fr from './fr'

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale]
}

export type { Dictionary }
