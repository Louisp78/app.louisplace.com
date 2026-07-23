export interface Dictionary {
	brand: {
		name: string
	}
	metadata: {
		title: string
		description: string
	}
	home: {
		tagline: string
		intro: string
		emptyState: string
	}
	post: {
		newBadge: string
		by: string
		publishedOn: string
		readingTime: (minutes: number) => string
	}
	footer: {
		copyright: string
		visitGithub: string
		technologies: string
	}
	github: {
		url: string
		iconAlt: string
	}
	languageSwitcher: {
		label: string
	}
	dateLocale: string
}
