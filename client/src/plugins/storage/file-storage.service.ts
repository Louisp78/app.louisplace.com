import fs from 'fs'
import IStorageService from './storage.service.interface'
import path from 'path'

export default class FileStorageService implements IStorageService {
	get(key: string, id: string): string | null {
		return fs.readFileSync(path.join(key, id), 'utf8')
	}
	getAll(key: string): string[] {
		return fs.readdirSync(key).filter((file) => file.endsWith('.json'))
	}
}
