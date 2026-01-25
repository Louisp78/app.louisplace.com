export default function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
	const sizeClasses = {
		sm: 'h-4 w-4 border-2',
		md: 'h-5 w-5 border-2',
		lg: 'h-8 w-8 border-3',
	}

	return (
		<div
			className={`inline-block animate-spin rounded-full border-white border-t-transparent ${sizeClasses[size]}`}
			role="status"
			aria-label="Loading"
		>
			<span className="sr-only">Loading...</span>
		</div>
	)
}
