'use client'

import { useState, useEffect } from 'react'
import TEXT from '@/constants/text'
import { useAuth } from '../auth/auth.context'

interface FormData {
	firstName: string
	lastName: string
	email: string
}

export default function UserInfosPage() {
	const { user } = useAuth()
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
	})
	const [originalData, setOriginalData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
	})
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	useEffect(() => {
		if (user) {
			const userData: FormData = {
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.email || '',
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setMessage(null)

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user?.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(formData),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.ok) {
				setOriginalData(formData)
				setMessage({ type: 'success', text: TEXT.userInfoPage.successUpdate })
				setLoading(false)
			} else {
				setMessage({ type: 'error', text: TEXT.userInfoPage.errorUpdate })
				setLoading(false)
			}
		} catch {
			setMessage({ type: 'error', text: TEXT.userInfoPage.errorUpdate })
			setLoading(false)
		}
	}

	const handleLogout = async () => {
		try {
			await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
				method: 'POST',
			})
		} catch {
			// Handle logout error
		}
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
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" disabled={loading || !isFormDirty}>
					Submit
				</button>
			</form>
			<button onClick={handleLogout}>Logout</button>
			{message && <div>{message.text}</div>}
		</div>
	)
}
