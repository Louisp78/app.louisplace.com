import type { Dictionary } from './dictionary'

const en: Dictionary = {
	brand: {
		name: 'Louis Place',
	},
	metadata: {
		title: 'Louis Place - Underwater Robotics Blog',
		description:
			'Notes and build logs from making underwater robots — ROVs, AUVs, and everything it takes to get a machine to survive and work below the surface.',
	},
	home: {
		tagline: 'Underwater robotics, one project at a time.',
		intro:
			"I design and build underwater robots — ROVs, AUVs, along with the electronics, control software and hardware that make them run. This is where I write about what I'm building, what broke, and what I learned.",
		emptyState: 'No articles yet — the first project log is coming soon.',
	},
	post: {
		newBadge: 'New',
		by: 'By',
		publishedOn: 'Published on',
		readingTime: (minutes) => `${minutes} min read`,
	},
	footer: {
		copyright: 'Louis Place. All rights reserved.',
		visitGithub: 'View the source code on GitHub',
		technologies:
			'Made with ❤️ using Next.js, TypeScript and Tailwind CSS. Hosted on my own VPS 🫶',
	},
	github: {
		url: 'https://github.com/Louisp78/louisplace.com',
		iconAlt: 'GitHub logo',
	},
	languageSwitcher: {
		label: 'Change language',
	},
	dateLocale: 'en-US',
}

export default en
