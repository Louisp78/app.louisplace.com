import { AuthProviderEnum } from './auth-provider.enum'

export default interface IOAuthService {
	getAuthCodeUrlWithParams(provider: AuthProviderEnum): Promise<string>
	verifyState(paramState: string): Promise<boolean>
}
