import z from 'zod'

const authSchema = z.object({
	username: z.string().min(3).max(50),
	password: z.string().min(8).max(255),
})

export const validateAuthSchema = (input) => {
	return authSchema.safeParse(input)
}