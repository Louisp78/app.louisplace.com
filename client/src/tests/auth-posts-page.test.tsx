import '@testing-library/jest-dom'

import PostsPage from '@/app/page'
import { HttpStatus } from '@/utils/http-status'
import { renderWithProviders } from './test-utils'

describe('Auth of Posts Page', () => {
	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				ok: true,
				json: () => Promise.resolve({}),
			} as Response)
		) as jest.Mock
	})

	test('should display user-info icon when user is logged in', () => {
		const screen = renderWithProviders(<PostsPage />)

		expect(screen.getByTestId('user-info-icon')).toBeInTheDocument()
	})

	test('should not display user-info icon when user is not logged in', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: HttpStatus.Unauthorized,
				ok: false,
			} as Response)
		) as jest.Mock

		const screen = renderWithProviders(<PostsPage />)

		expect(screen.queryByTestId('user-info-icon')).toBeNull()
	})
})
