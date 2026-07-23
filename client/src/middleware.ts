import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales } from './i18n/config'

function getPreferredLocale(request: NextRequest): string {
	const acceptLanguage = request.headers.get('accept-language')
	if (!acceptLanguage) {
		return defaultLocale
	}

	// Parse "fr-FR,fr;q=0.9,en;q=0.8" into ordered base language codes.
	const requested = acceptLanguage
		.split(',')
		.map((part) => part.split(';')[0].trim().split('-')[0].toLowerCase())

	const match = requested.find((lang) => (locales as readonly string[]).includes(lang))
	return match ?? defaultLocale
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const hasLocale = locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
	)

	if (hasLocale) {
		return NextResponse.next()
	}

	const locale = getPreferredLocale(request)
	const url = request.nextUrl.clone()
	url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
	return NextResponse.redirect(url)
}

export const config = {
	// Skip Next internals, the API and any file with an extension (static assets).
	matcher: ['/((?!_next|.*\\..*).*)'],
}
