import { PostDataContent } from '../post'
import PostContent from './post-content'

type CalloutStyle = 'info' | 'warning' | 'error' | 'success'
type CalloutProps = {
	header: PostDataContent | null
	content: PostDataContent
	style: CalloutStyle
}

export default function Callout(props: CalloutProps) {
	return (
		<div className={`mb-6 rounded-lg p-6 ${getCalloutStyle(props.style)}`}>
			{props.header && <PostContent component={props.header} />}
			<PostContent component={props.content} />
		</div>
	)
}
function getCalloutStyle(style: CalloutStyle): string {
	switch (style) {
		case 'info':
			return 'bg-blue-50 border-l-4 border-blue-400 text-black'
		case 'warning':
			return 'bg-yellow-50 border-l-4 border-yellow-400 text-black'
		case 'success':
			return 'bg-green-50 border-l-4 border-green-400 text-black'
		default:
			return 'bg-gray-50 border-l-4 border-gray-400 text-black'
	}
}
