export function parseInlineMarkdown(text: string): string {
	let formattedText = text.replace(/\n/g, '<br />')
	formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
	formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>')
	return formattedText
}
