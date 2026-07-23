import type { Dictionary } from './dictionary'

const fr: Dictionary = {
	brand: {
		name: 'Louis Place',
	},
	metadata: {
		title: 'Louis Place - Blog de Robotique Sous-Marine',
		description:
			"Notes et comptes-rendus de la construction de robots sous-marins — ROV, AUV, et tout ce qu'il faut pour qu'une machine survive et fonctionne sous la surface.",
	},
	home: {
		tagline: 'La robotique sous-marine, un projet à la fois.',
		intro:
			"Je conçois et construis des robots sous-marins — ROV, AUV, ainsi que l'électronique, le logiciel de contrôle et le matériel qui les font fonctionner. C'est ici que je raconte ce que je construis, ce qui a cassé, et ce que j'ai appris.",
		emptyState: "Pas encore d'articles — le premier compte-rendu de projet arrive bientôt.",
	},
	post: {
		newBadge: 'Nouveau',
		by: 'Par',
		publishedOn: 'Publié le',
		readingTime: (minutes) => `${minutes} min de lecture`,
	},
	footer: {
		copyright: 'Louis Place. Tous droits réservés.',
		visitGithub: 'Voir le code source sur GitHub',
		technologies: 'Fait avec ❤️ avec Next.js, TypeScript et Tailwind CSS. Hébergé sur mon VPS 🫶',
	},
	github: {
		url: 'https://github.com/Louisp78/louisplace.com',
		iconAlt: 'Logo GitHub',
	},
	languageSwitcher: {
		label: 'Changer de langue',
	},
	dateLocale: 'fr-FR',
}

export default fr
