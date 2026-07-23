import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Server runtime (not static export): the bilingual routing relies on
	// Next.js middleware, which is incompatible with output: 'export'.
	eslint: {
		ignoreDuringBuilds: true,
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

export default nextConfig
