import {
	AuthControllerApi,
	BASE_PATH,
	Configuration,
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
	const csrfToken = getCsrfToken()
	return new Configuration({
		basePath: BASE_PATH,
		credentials: 'include',
		headers: csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : undefined,
	})
}

export const userControllerApi = new UserControllerApi(config())
export const authControllerApi = new AuthControllerApi(config())
