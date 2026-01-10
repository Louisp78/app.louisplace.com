import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'
import prettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@stylistic': stylistic,
			prettier: prettier,
		},

		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		rules: {
			'no-console': 'error',
			'prettier/prettier': 'error',
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: [
								'@/features/*/*',
								'!@/features/*/index.client',
								'!@/features/*/index.server',
								'!@/features/*/index',
							],
							message: 'Import from feature barrel file (@/features/*/index) instead.',
						},
					],
				},
			],
		},
	},

]

export default eslintConfig
