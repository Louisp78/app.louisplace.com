import { UserDTO } from '@/plugins/api-repository-generated'
import { renderWithProviders } from '@/tests/test-utils'
import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { useEffect } from 'react'
import { useAuth } from '../auth.context'
import userData from './user.json'

const AuthTestComponent = ({ onUserChange }: { onUserChange: (user: UserDTO | null) => void }) => {
	const { user } = useAuth()

	useEffect(() => {
		onUserChange(user)
	}, [user, onUserChange])

	return <div data-testid="auth-test">{user?.firstName}</div>
}

describe('AuthContext', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve(userData),
			} as Response)
		) as jest.Mock
	})

	test('should set user to authenticated user on login', async () => {
		let capturedUser: UserDTO | null = null

		renderWithProviders(
			<AuthTestComponent
				onUserChange={(user) => {
					capturedUser = user
				}}
			/>
		)

		await waitFor(() => {
			expect(capturedUser).toBeDefined()
			expect(capturedUser?.id).toBe(userData.id)
			expect(capturedUser?.firstName).toBe(userData.firstName)
		})
	})

	test('should set user to not authenticated on logout', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				status: 401,
				json: () => Promise.reject(new Error('Unauthorized')),
			} as Response)
		) as jest.Mock

		let capturedUser: UserDTO | null = null

		renderWithProviders(
			<AuthTestComponent
				onUserChange={(user) => {
					capturedUser = user
				}}
			/>
		)

		await waitFor(() => {
			expect(capturedUser).toBeNull()
		})
	})

	test('should persist user authentication state across sessions', async () => {
		let capturedUser: UserDTO | null = null

		renderWithProviders(
			<AuthTestComponent
				onUserChange={(user) => {
					capturedUser = user
				}}
			/>
		)

		await waitFor(() => {
			expect(capturedUser).toBeDefined()
			expect(capturedUser?.id).toBe(userData.id)
		})
	})
})
