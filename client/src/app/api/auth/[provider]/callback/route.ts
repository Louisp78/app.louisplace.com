import { authContainer, AuthProviderEnum } from '@/plugins/auth/index.server'
import { NextResponse } from 'next/server'

const PARAM_CODE = 'code'
const PARAM_STATE = 'state'

const HEADER_SET_COOKIE = 'Set-Cookie'

export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
	const provider: AuthProviderEnum = (await params).provider as AuthProviderEnum

	const url = new URL(request.url)
	const code = url.searchParams.get(PARAM_CODE)
	const state = url.searchParams.get(PARAM_STATE)

	const stateCheck = await authContainer.service().verifyState(state || '')
	if (!stateCheck || !code) {
		return NextResponse.redirect(new URL('/?error=no_code', request.url))
	}

	const queryParams = new URLSearchParams({ code })
	const requestUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauth/${provider}?${queryParams.toString()}`
	const response = await fetch(requestUrl, {
		method: 'POST',
	})

	if (!response.ok) {
		return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
	}

	const redirectResponse = NextResponse.redirect(new URL('/?login=success', request.url))

	const setCookieHeaders = response.headers.getSetCookie()
	setCookieHeaders.forEach((cookie) => {
		redirectResponse.headers.append(HEADER_SET_COOKIE, cookie)
	})

	return redirectResponse
}
