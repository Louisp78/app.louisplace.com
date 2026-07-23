import AppBar from '@/components/app-bar/app-bar'
import Footer from '@/components/footer'
import fontService from '@/font/font.service'
import { isLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'

interface LocaleLayoutProps {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = getDictionary(isLocale(locale) ? locale : 'fr')

	return {
		title: dict.metadata.title,
		description: dict.metadata.description,
	}
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale } = await params

	if (!isLocale(locale)) {
		notFound()
	}

	const typedLocale: Locale = locale
	const dict = getDictionary(typedLocale)

	return (
		<html
			lang={typedLocale}
			className={`${fontService.fontBase.className} ${fontService.fontTitle.variable}`}
		>
			<body className={`overflow-y-auto antialiased`}>
				<div className="flex min-h-screen flex-col">
					<AppBar locale={typedLocale} dict={dict} />
					<div className="flex-1">{children}</div>
				</div>
				<Footer dict={dict} />
			</body>
		</html>
	)
}
