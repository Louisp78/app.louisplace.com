'use client'

import {
	AuthControllerApi,
	BASE_PATH,
	Configuration,
	CodePieceControllerApi,
	UserControllerApi,
} from '@/plugins/api-repository-generated'

function getCsrfToken(): string | undefined {
	const cookies = document.cookie.split('; ')
	const csrfCookie = cookies.find((cookie) => cookie.startsWith('XSRF-TOKEN='))
	if (csrfCookie) {
		return decodeURIComponent(csrfCookie.split('=')[1])
	}
	return undefined
}

const config = () => {
	const csrfToken = typeof document !== 'undefined' ? getCsrfToken() : undefined
	return new Configuration({
		basePath: BASE_PATH,
		credentials: 'include',
		headers: csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : undefined,
	})
}

export const userControllerApi = new UserControllerApi(config())
export const authControllerApi = new AuthControllerApi(config())
export const codePieceControllerApi = new CodePieceControllerApi(config())
