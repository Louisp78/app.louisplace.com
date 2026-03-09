import '@testing-library/jest-dom'
import { act, fireEvent, waitFor } from '@testing-library/react'

import TEXT from '@/constants/text'
import { renderWithProviders } from '@/tests/test-utils'
import UserInfosPage from '../user-infos-page'

import userData from './user.json'

describe('User Info Page', () => {
	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve(userData),
			} as Response)
		) as jest.Mock
	})

	test('should display user information correctly', async () => {
		const screen = renderWithProviders(<UserInfosPage />)

		await waitFor(() => {
			expect(screen.getByText(new RegExp(userData.firstName))).toBeInTheDocument()
		})
	})

	test('should render a form', () => {
		const screen = renderWithProviders(<UserInfosPage />)

		const firstNameInput = screen.getByLabelText('First Name')
		const lastNameInput = screen.getByLabelText('Last Name')
		const submitButton = screen.getByRole('button', { name: /save changes/i })

		expect(firstNameInput).toBeInTheDocument()
		expect(lastNameInput).toBeInTheDocument()
		expect(submitButton).toBeInTheDocument()
	})

	test('should update user information on form submission', async () => {
		const screen = renderWithProviders(<UserInfosPage />)

		const firstNameInput = screen.getByLabelText('First Name')
		const lastNameInput = screen.getByLabelText('Last Name')
		const submitButton = screen.getByRole('button', { name: /save changes/i })

		fireEvent.change(firstNameInput, { target: { value: 'NewFirstName' } })
		fireEvent.change(lastNameInput, { target: { value: 'NewLastName' } })

		await act(async () => {
			fireEvent.click(submitButton)
		})

		expect(global.fetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				method: 'PUT',
			})
		)
	})

	test('should disconnect user when clicking logout button', async () => {
		const screen = renderWithProviders(<UserInfosPage />)

		await waitFor(() => {
			const logoutButton = screen.getByRole('button', { name: /logout/i })
			fireEvent.click(logoutButton)
		})

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					method: 'POST',
				})
			)
		})
	})

	test('should disable form submission while updating', async () => {
		const screen = renderWithProviders(<UserInfosPage />)

		const submitButton = screen.getByRole('button', { name: /save changes/i })

		await act(async () => {
			fireEvent.click(submitButton)
		})

		expect(submitButton).toBeDisabled()
	})

	test('should show success message on successful update', async () => {
		const screen = renderWithProviders(<UserInfosPage />)

		await waitFor(() => {
			const firstNameInput = screen.getByLabelText('First Name')
			fireEvent.change(firstNameInput, { target: { value: 'NewName' } })
		})

		const submitButton = screen.getByRole('button', { name: /save changes/i })

		await act(async () => {
			fireEvent.click(submitButton)
		})

		await waitFor(
			() => {
				expect(screen.getByText(TEXT.userInfoPage.successUpdate)).toBeInTheDocument()
			},
			{ timeout: 3000 }
		)
	})

	test('should show error message on failed update', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			} as Response)
		) as jest.Mock

		const screen = renderWithProviders(<UserInfosPage />)

		await waitFor(() => {
			const firstNameInput = screen.getByLabelText('First Name')
			fireEvent.change(firstNameInput, { target: { value: 'NewName' } })
		})

		const submitButton = screen.getByRole('button', { name: /save changes/i })

		await act(async () => {
			fireEvent.click(submitButton)
		})

		await waitFor(
			() => {
				expect(screen.getByText(TEXT.userInfoPage.errorUpdate)).toBeInTheDocument()
			},
			{ timeout: 3000 }
		)
	})

	test('should enable submit button when form is filled with different data from original', () => {
		const screen = renderWithProviders(<UserInfosPage />)

		const firstNameInput = screen.getByLabelText('First Name')
		const submitButton = screen.getByRole('button', { name: /save changes/i })

		fireEvent.change(firstNameInput, { target: { value: 'DifferentName' } })

		expect(submitButton).toBeEnabled()
	})

	test('should disable submit button when form is filled with the same data as original', () => {
		const screen = renderWithProviders(<UserInfosPage />)

		const submitButton = screen.getByRole('button', { name: /save changes/i })

		expect(submitButton).toBeDisabled()
	})
})
