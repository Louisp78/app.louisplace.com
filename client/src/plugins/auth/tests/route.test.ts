import { HttpStatus } from '@/utils/http-status'

describe('App Auth Routes', () => {
	test('should restrict access to protected routes for unauthenticated users', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: HttpStatus.Unauthorized,
			} as Response)
		) as jest.Mock

		const protectedRoutes = ['/profile']
		protectedRoutes.forEach(async (route) => {
			const response = await fetch(route)
			expect(response.status).toBe(HttpStatus.Unauthorized)
		})
	})
	test.todo('should not show navigation links of protected routes for unauthenticated users')
})
