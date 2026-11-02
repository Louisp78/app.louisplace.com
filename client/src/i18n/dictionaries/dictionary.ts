export interface Dictionary {
	brand: {
		name: string
		shortName: string
	}
	metadata: {
		title: string
		description: string
	}
	appBar: {
		about: string
		navLabel: string
		openMenu: string
		closeMenu: string
	}
	about: {
		title: string
		intro: string
		metadata: {
			title: string
			description: string
		}
		sections: {
			heading: string
			paragraphs: string[]
		}[]
	}
	home: {
		tagline: string
		intro: string
		modelLabel: string
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
	scannerRoom: {
		name: string
		url: string
	}
	languageSwitcher: {
		label: string
	}
	dateLocale: string
}
