import { HttpStatus } from '@/utils/http-status'
import { useAuth } from '../auth.context'

describe('AuthContext', () => {
	beforeAll(() => {})

	test('should set user to authenticated user on login', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						id: 1,
						firstName: 'Louis',
						lastName: 'Place',
						email: 'example@gmail.com',
						username: 'llouisp',
					}),
			} as Response)
		) as jest.Mock
		// TODO: need to use renderHook with AuthProvider
		const { user } = useAuth()

		expect(user).toBeDefined()
		expect(user?.id).toBeDefined()
	})
	test('should set user to not authenticated on logout', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: HttpStatus.Unauthorized,
			} as Response)
		) as jest.Mock

		// TODO: need to use renderHook with AuthProvider
		const { user } = useAuth()

		expect(user).toBeNull()
	})
	test('should persist user authentication state across sessions', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						id: 1,
						firstName: 'Louis',
						lastName: 'Place',
						email: 'example@gmail.com',
						username: 'llouisp',
					}),
			} as Response)
		) as jest.Mock

		// TODO: need to use renderHook with AuthProvider
		const { user } = useAuth()

		expect(user).toBeDefined()
		expect(localStorage.getItem('user')).toBeDefined()
	})
})
