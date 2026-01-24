export type PostDataContent =
	| {
			type: 'title'
			data: {
				text: string
			}
	  }
	| {
			type: 'spaced-content'
			data: {
				content: PostDataContent
			}
	  }
	| {
			type: 'subtitle'
			data: {
				text: string
			}
	  }
	| {
			type: 'callout'
			data: {
				header: PostDataContent | null
				content: PostDataContent
				style: CalloutStyle
			}
	  }
	| {
			type: 'ul'
			data: {
				header: PostDataContent | null
				items: PostDataContent[]
			}
	  }
	| {
			type: 'quote'
			data: {
				content: PostDataContent
				highlight: boolean
			}
	  }
	| {
			type: 'link'
			data: {
				href: string
				content: string
			}
	  }
	| string

export interface PostMetadata {
	title: string
	summary: string
	slug: string
	image: {
		src: string
		width: number
		height: number
		alt: string
	}
	author: string
	publishedAt: string
	estimatedReadingTimeMinutes: number
	tags?: string[]
	category?: string
}

export interface PostData {
	metadata: PostMetadata
	content: Array<PostDataContent>
}
