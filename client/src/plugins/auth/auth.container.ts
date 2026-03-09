import OAuthService from './oauth.service'
import IOAuthService from './oauth.service.interface'

const authContainer = {
	service: (): IOAuthService => new OAuthService(),
}

export default authContainer
