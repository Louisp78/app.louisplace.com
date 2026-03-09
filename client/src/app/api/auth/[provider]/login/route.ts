import { authContainer, AuthProviderEnum } from '@/plugins/auth/index.server'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ provider: string }> }) {
	const provider: AuthProviderEnum = (await params).provider as AuthProviderEnum
	return NextResponse.redirect(await authContainer.service().getAuthCodeUrlWithParams(provider))
}
