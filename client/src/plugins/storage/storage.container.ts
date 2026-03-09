import FileStorageService from './file-storage.service'
import IStorageService from './storage.service.interface'

const storageContainer = {
	service: (): IStorageService => new FileStorageService(),
}

export default storageContainer
