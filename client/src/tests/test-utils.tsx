import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/plugins/auth/auth.context'

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
	queryClient?: QueryClient
}

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
