import jwt from 'jsonwebtoken'
import { validateAuthSchema } from '../schemas/auth.js'
import { IAuthModel } from '../models/pg/authInterfaces.js'
import { IAuthRequestBody, IAuthResponse } from './authInterfaces.js'

export class AuthController {
	authModel: IAuthModel
	constructor({ authModel }: { authModel: IAuthModel }) {
		this.authModel = authModel
	}

	login = async (req: IAuthRequestBody, res: IAuthResponse) => {
		try {
			const validationResult = validateAuthSchema(req.body)

			if (!validationResult.success) {
				return res.status(422).json({ error: validationResult.error?.message })
			}

			const { usernameOrEmail, password } = req.body
			const isValidCredentials = await this.authModel.verifyCredentials({ usernameOrEmail, password })

			if (!isValidCredentials) {
				return res.status(401).json({ message: 'Invalid credentials' })
			}

			const jwtSecret = process.env.JWT_SECRET!
			const expiresIn = '365d'
			const token = jwt.sign({ usernameOrEmail }, jwtSecret, { expiresIn })

			res.json({ token })
		} catch (err) {
			console.error('Error al procesar la solicitud:', err)

			if (typeof err === 'object' && err !== null && 'message' in err) {
				res.status(500).json({ message: 'Error interno del servidor', error: String(err.message) })
			} else {
				res.status(500).json({ message: 'Error interno del servidor', error: String(err) })
			}
		}

	}
}
