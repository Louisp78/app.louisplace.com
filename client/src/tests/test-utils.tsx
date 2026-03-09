import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/plugins/auth/index.client'

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
	queryClient?: QueryClient
}

// Mock next/navigation before rendering components that use useRouter
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
	}),
	usePathname: () => '/',
	useSearchParams: () => new URLSearchParams(),
}))

export function renderWithProviders(
	ui: React.ReactElement,
	{ queryClient, ...renderOptions }: RenderWithProvidersOptions = {}
) {
	const defaultQueryClient = new QueryClient()
	const clientToUse = queryClient || defaultQueryClient

	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<QueryClientProvider client={clientToUse}>
				<AuthProvider>{children}</AuthProvider>
			</QueryClientProvider>
		)
	}

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
