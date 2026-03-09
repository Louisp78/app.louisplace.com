import { PostDataContent } from '../post'
import PostContent from './post-content'

export type QuoteProps = {
	highlight?: boolean
	content?: PostDataContent
}

export default function Quote(props: QuoteProps) {
	return (
		<blockquote
			className={`mb-6 border-l-4 border-blue-500 py-4 pl-6 italic ${
				props.highlight ? 'rounded-r-lg bg-blue-50 text-black' : ''
			}`}
		>
			{'content' in props && props.content ? <PostContent component={props.content} /> : null}
		</blockquote>
	)
}
