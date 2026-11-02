import type { Dictionary } from './dictionary'

const fr: Dictionary = {
	brand: {
		name: 'Fish Changelogs',
		shortName: 'Changelogs',
	},
	metadata: {
		title: 'Fish Changelogs - Blog de Robotique Sous-Marine',
		description:
			"Notes et comptes-rendus de la construction de robots sous-marins — ROV, AUV, et tout ce qu'il faut pour qu'une machine survive et fonctionne sous la surface.",
	},
	appBar: {
		about: 'À propos',
		navLabel: 'Navigation principale',
		openMenu: 'Ouvrir le menu',
		closeMenu: 'Fermer le menu',
	},
	about: {
		title: 'À propos',
		intro:
			"Moi c'est Louis. Je construis des robots sous-marins sur mon temps libre, et ce blog est le carnet de bord de ces bricolages.",
		metadata: {
			title: 'À propos - Fish Changelogs',
			description:
				"Qui je suis, pourquoi j'écris ces comptes-rendus de construction de robots sous-marins, et sur quoi je travaille en ce moment.",
		},
		sections: [
			{
				heading: 'Pourquoi ce blog',
				paragraphs: [
					"J'ai commencé à écrire ici parce que j'oubliais la moitié de ce que je faisais d'une semaine à l'autre. Quel câble va où, pourquoi j'avais choisi ce connecteur, ce qui avait déjà grillé une fois.",
					"Du coup chaque article est un changelog : ce que j'ai monté, ce qui a cassé, et ce que j'ai compris après coup.",
				],
			},
			{
				heading: 'Sur quoi je travaille',
				paragraphs: [
					"En ce moment sur le CPS Five, un ROV que je construis pièce par pièce : distribution de puissance, câblage, électronique de contrôle, et l'étanchéité qui va avec.",
					"Je ne suis pas ingénieur en robotique marine, j'apprends en faisant. Il y a donc des erreurs dans ces pages, et elles y restent, c'est souvent la partie la plus utile.",
				],
			},
			{
				heading: 'Me contacter',
				paragraphs: [
					'Le code du site est sur GitHub, le lien est en haut de la page. Si vous avez une remarque ou une question sur un montage, passez par là.',
				],
			},
		],
	},
	home: {
		tagline: 'Un projet de robotique sous-marine',
		intro:
			"Le changelog de la construction d'un robot sous-marin (ROV). C'est ici que je raconte ce que je construis, ce qui a cassé, et ce que j'ai appris.",
		modelLabel: 'Dessin filaire du robot en rotation',
		emptyState: "Pas encore d'articles, le premier compte-rendu de projet arrive bientôt.",
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
	scannerRoom: {
		name: 'ScannerRoom',
		url: 'https://scannerroom.louisplace.com',
	},
	languageSwitcher: {
		label: 'Changer de langue',
	},
	dateLocale: 'fr-FR',
}

export default fr
