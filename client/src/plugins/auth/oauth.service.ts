import { cookies } from 'next/headers'
import crypto from 'crypto'
import IOAuthService from './oauth.service.interface'
import { AuthProviderEnum } from './auth-provider.enum'

const STATE_COOKIE_MAX_AGE = 10 * 60
const STATE_COOKIE_KEY = 'oauth_state'

const RESPONSE_TYPE = 'code'

const GOOGLE_SCOPES = ['openid', 'email', 'profile']
const GITHUB_SCOPES = ['read:user', 'user:email']

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'

export default class OAuthService implements IOAuthService {
	public async verifyState(paramState: string): Promise<boolean> {
		const cookieStore = await cookies()
		const storedState = cookieStore.get(STATE_COOKIE_KEY)?.value

		const result = !!paramState && !!storedState && paramState === storedState
		if (result) {
			cookieStore.delete(STATE_COOKIE_KEY)
		}

		return result
	}

	public async getAuthCodeUrlWithParams(provider: AuthProviderEnum): Promise<string> {
		const params = await this.getParams(provider)
		return `${OAuthService.getAuthBaseUrl(provider)}?${params.toString()}`
	}

	private async getParams(provider: AuthProviderEnum): Promise<URLSearchParams> {
		const state = this.generateState()
		await this.storeState(state)

		switch (provider) {
			case AuthProviderEnum.GOOGLE:
				return new URLSearchParams({
					client_id: process.env.GOOGLE_ID || '',
					redirect_uri: `${process.env.PUBLIC_URL}/api/auth/google/callback`,
					response_type: RESPONSE_TYPE,
					scope: GOOGLE_SCOPES.join(' '),
					state,
				})
			case AuthProviderEnum.GITHUB:
				return new URLSearchParams({
					client_id: process.env.GITHUB_ID || '',
					redirect_uri: `${process.env.PUBLIC_URL}/api/auth/github/callback`,
					response_type: RESPONSE_TYPE,
					scope: GITHUB_SCOPES.join(' '),
					state,
				})
		}
	}

	private static getAuthBaseUrl(provider: AuthProviderEnum): string {
		switch (provider) {
			case AuthProviderEnum.GOOGLE:
				return GOOGLE_AUTH_URL
			case AuthProviderEnum.GITHUB:
				return GITHUB_AUTH_URL
		}
	}

	private generateState(): string {
		return crypto.randomBytes(32).toString('hex')
	}

	private async storeState(state: string): Promise<void> {
		const cookieStore = await cookies()
		cookieStore.set(STATE_COOKIE_KEY, state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: STATE_COOKIE_MAX_AGE,
			path: '/',
		})
	}
}
