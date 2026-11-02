import type { Dictionary } from './dictionary'

const en: Dictionary = {
	brand: {
		name: 'Fish Changelogs',
		shortName: 'Changelogs',
	},
	metadata: {
		title: 'Fish Changelogs - Underwater Robotics Blog',
		description:
			'Notes and build logs from making underwater robots — ROVs, AUVs, and everything it takes to get a machine to survive and work below the surface.',
	},
	appBar: {
		about: 'About',
		navLabel: 'Main navigation',
		openMenu: 'Open the menu',
		closeMenu: 'Close the menu',
	},
	about: {
		title: 'About me',
		intro:
			"I'm Louis. I build underwater robots in my spare time, and this blog is the logbook of that tinkering.",
		metadata: {
			title: 'About - Fish Changelogs',
			description:
				'Who I am, why I write these underwater robot build logs, and what I am working on right now.',
		},
		sections: [
			{
				heading: 'Why this blog',
				paragraphs: [
					'I started writing here because I kept forgetting half of what I had done from one week to the next. Which cable goes where, why I picked that connector, what had already burned once.',
					'So every article is a changelog: what I assembled, what broke, and what I figured out afterwards.',
				],
			},
			{
				heading: 'What I am working on',
				paragraphs: [
					'Right now the CPS Five, an ROV I am building piece by piece: power distribution, wiring, control electronics, and the waterproofing that goes with it.',
					'I am not a marine robotics engineer, I learn by doing. So there are mistakes in these pages, and they stay there, that is often the most useful part.',
				],
			},
			{
				heading: 'Get in touch',
				paragraphs: [
					'The source code of this site is on GitHub, the link is at the top of the page. If you have a remark or a question about a build, that is the way in.',
				],
			},
		],
	},
	home: {
		tagline: 'An underwater robotics project',
		intro:
			"The changelog of an underwater robot (ROV) build. This is where I write about what I'm building, what broke, and what I learned.",
		modelLabel: 'Rotating wireframe drawing of the robot',
		emptyState: 'No articles yet, the first project log is coming soon.',
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
	scannerRoom: {
		name: 'ScannerRoom',
		url: 'https://scannerroom.louisplace.com',
	},
	languageSwitcher: {
		label: 'Change language',
	},
	dateLocale: 'en-US',
}

export default en
