'use client'

import TEXT from '@/constants/text'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/auth.context'
import { useLogout } from './hooks/useLogout'
import useUpdateUserInfos from './hooks/useUpdateUserInfos'

interface FormData {
	firstName: string
	lastName: string
}

export default function UserInfosPage() {
	const { user } = useAuth()
	const { mutate: updateUserInfos, isPending: loading } = useUpdateUserInfos()
	const { mutate: logout, isPending: loggingOut } = useLogout()
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
	})
	const [originalData, setOriginalData] = useState<FormData>({
		firstName: '',
		lastName: '',
	})
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	useEffect(() => {
		if (user) {
			const userData: FormData = {
				firstName: user.firstName || '',
				lastName: user.lastName || '',
			}
			setFormData(userData)
			setOriginalData(userData)
		}
	}, [user])

	const isFormDirty = JSON.stringify(formData) !== JSON.stringify(originalData)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setMessage(null)

		updateUserInfos(formData, {
			onSuccess: () => {
				setOriginalData(formData)
				setMessage({ type: 'success', text: TEXT.userInfoPage.successUpdate })
			},
			onError: () => {
				setMessage({ type: 'error', text: TEXT.userInfoPage.errorUpdate })
			},
		})
	}

	return (
		<div>
			<h1>
				User Info Page for {user?.firstName} with {user?.lastName}
			</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="firstName">First Name</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						value={formData.firstName}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="lastName">Last Name</label>
					<input
						id="lastName"
						name="lastName"
						type="text"
						value={formData.lastName}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" disabled={loading || !isFormDirty}>
					Submit
				</button>
			</form>
			<button disabled={loggingOut} onClick={() => logout()}>
				Logout
			</button>
			{message && <div>{message.text}</div>}
		</div>
	)
}
