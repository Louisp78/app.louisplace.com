'use client'

import TEXT from '@/constants/text'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useAuth } from '../auth/auth.context'
import { useLogout } from './hooks/useLogout'
import useUpdateUserInfos from './hooks/useUpdateUserInfos'
import Spinner from '@/components/spinner'

const formSchema = z.object({
	firstName: z.string().min(1, 'First name is required').trim(),
	lastName: z.string().min(1, 'Last name is required').trim(),
})

type FormData = z.infer<typeof formSchema>

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
	const isFormValid = () => {
		const result = formSchema.safeParse(formData)
		return result.success
	}

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

	const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setMessage(null)

		if (!isFormValid()) {
			return
		}

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
		<div className="relative min-h-[calc(100vh-4rem)] w-full">
			<div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
				<div className="w-full max-w-md rounded-xl border border-white/20 bg-black/80 p-8 shadow-2xl backdrop-blur-md">
					<div className="mb-8 text-center">
						<h1 className="mb-2 font-[Syne] text-3xl font-bold text-white">Profile Settings</h1>
						<p className="text-sm text-gray-400">
							Manage your account information, {user?.firstName}
						</p>
					</div>

					<form onSubmit={updateUser} className="space-y-6">
						<div>
							<label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-300">
								First Name
							</label>
							<input
								id="firstName"
								name="firstName"
								type="text"
								value={formData.firstName}
								onChange={handleChange}
								className={`w-full rounded-lg border bg-black/50 px-4 py-3 text-white placeholder-gray-500 transition focus:ring-2 focus:outline-none`}
								placeholder="Enter your first name"
							/>
						</div>

						<div>
							<label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-300">
								Last Name
							</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								value={formData.lastName}
								onChange={handleChange}
								className={`w-full rounded-lg border bg-black/50 px-4 py-3 text-white placeholder-gray-500 transition focus:ring-2 focus:outline-none`}
								placeholder="Enter your last name"
							/>
						</div>

						{message && (
							<div
								className={`rounded-lg p-3 text-sm ${
									message.type === 'success'
										? 'bg-green-500/20 text-green-400'
										: 'bg-red-500/20 text-red-400'
								}`}
							>
								{message.text}
							</div>
						)}

						<button
							type="submit"
							disabled={loading || !isFormDirty || !formSchema.safeParse(formData).success}
							className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--secondary)] px-4 py-3 font-medium text-white transition hover:bg-[var(--secondary)]/90 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{loading ? (
								<>
									<Spinner size="sm" />
									<span>Updating...</span>
								</>
							) : (
								'Save Changes'
							)}
						</button>
					</form>

					{/* Logout Button */}
					<div className="mt-6 border-t border-gray-700 pt-6">
						<button
							disabled={loggingOut}
							onClick={() => logout()}
							className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500/50 px-4 py-3 font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{loggingOut ? (
								<>
									<Spinner size="sm" />
									<span>Logging out...</span>
								</>
							) : (
								'Logout'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
