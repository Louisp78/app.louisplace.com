import AppBar from '@/components/app-bar/app-bar'
import Footer from '@/components/footer'
import QueryClientCustomProvider from '@/config/query-client-custom-provider'
import TEXT from '@/constants/text'
import { AuthProvider } from '@/features/auth/index.client'
import fontService from '@/font/font.service'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: TEXT.metadata.title,
	description: TEXT.metadata.description,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${fontService.fontBase.className} ${fontService.fontTitle.variable}`}
		>
			<body className={`overflow-y-auto antialiased`}>
				<QueryClientCustomProvider>
					<AuthProvider>
						<AppBar />
						<div className="min-h-screen pt-16">{children}</div>
						<Footer />
					</AuthProvider>
				</QueryClientCustomProvider>
			</body>
		</html>
	)
}
