import { z } from 'zod'

const EnvSchema = z.object({
	PUBLIC_BASE_URL: z.string().min(1, 'PUBLIC_BASE_URL is required'),
	PUBLIC_URL: z.url('PUBLIC_URL must be a valid URL'),
})

export type EnvironmentInterface = z.infer<typeof EnvSchema>

const Env: EnvironmentInterface = {
	PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL!,
	PUBLIC_URL: process.env.PUBLIC_URL!,
}

EnvSchema.parse(Env)

export default Env
