import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'

import AppBar from '@/components/app-bar/app-bar'
import { HttpStatus } from '@/utils/http-status'
import { renderWithProviders } from './test-utils'

const userData = {
	id: 1,
	firstName: 'Louis',
	lastName: 'Place',
	email: 'example@example.com',
	username: 'llouisp',
}

describe('Auth of Posts Page', () => {
	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				ok: true,
				json: () => Promise.resolve(userData),
			} as Response)
		) as jest.Mock
	})

	test('should display user firstName when user is logged in', async () => {
		const screen = renderWithProviders(<AppBar />)

		await waitFor(() => {
			expect(screen.getByText(`Hello, ${userData.firstName}`)).toBeInTheDocument()
		})
	})

	test('should not display user firstName when user is not logged in', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: HttpStatus.Unauthorized,
				ok: false,
				json: () => Promise.reject(new Error('Unauthorized')),
			} as Response)
		) as jest.Mock

		const screen = renderWithProviders(<AppBar />)

		await waitFor(
			() => {
				expect(screen.queryByText(`Hello, ${userData.firstName}`)).not.toBeInTheDocument()
			},
			{ timeout: 3000 }
		)
	})
})
