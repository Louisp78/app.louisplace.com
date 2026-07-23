Current app is a blog where I am documenting all my underwater robotic projects.
It's a simple blog made for me.

- Tech: Next.js

## Language

- The blog is bilingual: **French (`fr`) and English (`en`)**, with `/fr` and `/en` URL prefixes and a language switcher in the header.
- Every article must exist in **both** languages: a JSON file in `client/src/features/post/data/fr/` and one in `client/src/features/post/data/en/`, sharing the same `slug`, images, and metadata dates.
- Every UI string must be added to **both** dictionaries (`client/src/i18n/dictionaries/fr.ts` and `en.ts`); never hard-code user-facing text in components. The `Dictionary` type in `dictionary.ts` keeps the two in sync.
- `lang` is set dynamically per locale in `app/[locale]/layout.tsx`; dates are formatted with the locale from the dictionary (`dateLocale`).

## Article writing tone

- Stay humble and down-to-earth. Avoid grandiose or pretentious phrasing (e.g. "navigating between theoretical elegance and the brutal realities of physics" → banned).
- Talk plainly about the struggles and the silly little problems encountered, without playing the hero.
- Don't inflate routine steps with dramatic flourishes. Drilling a few holes is just drilling a few holes. Banned examples: "un travail méticuleux qui demande de la patience et de la rigueur", "pas de place pour l'improvisation quand on travaille avec des tensions et des courants significatifs", "transformant une collection de pièces en un module cohérent et robuste".
- Do not use `--` or em dashes (`—`) in prose. Rephrase with commas, parentheses, or a separate sentence instead.

## Images

- Article photos (in `client/public/`) must be resized to **1600 px wide max** and compressed (JPEG quality ~80, aim for ~300–450 KB) to stay consistent and lightweight.
- Convert `.HEIC` files to `.jpg` before adding them (e.g. `sips -s format jpeg src.HEIC --out dest.jpg`, then `sips --resampleWidth 1600 -s formatOptions 80 dest.jpg`).
