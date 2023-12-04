import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { IAuthModel } from '../models/pg/authInterfaces.js'

export const createAuthRouter = ({ authModel }: { authModel: IAuthModel }) => {
	const authRouter = Router()

	const authController = new AuthController({ authModel })

	authRouter.get('/', authController.login)

	return authRouter
}
