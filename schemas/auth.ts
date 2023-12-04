import z from 'zod'
import { IAuthRequest } from '../models/pg/authInterfaces.js'

const authSchema = z.object({
	usernameOrEmail: z.string().min(3).max(50),
	password: z.string().min(8).max(255),
})

export const validateAuthSchema = (input: IAuthRequest) => {
	return authSchema.safeParse(input)
}