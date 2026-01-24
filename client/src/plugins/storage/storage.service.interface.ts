export default interface IStorageService {
	getAll(key: string): string[]
	get(key: string, id: string): string | null
}
