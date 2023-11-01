import jwt from 'jsonwebtoken'
import { validateAuthSchema } from '../schemas/auth.js'

export class AuthController {
	constructor({ authModel }) {
		this.authModel = authModel
	}

	login = async (req, res) => {
		try {
			const result = validateAuthSchema(req.body)

			if (!result) {
				return res.status(422).json({ error: JSON.parse(result.error.message) })
			}

			const { usernameOrEmail, password } = req.body
			const isValidCredentials = await this.authModel.verifyCredentials({ usernameOrEmail, password })

			if (!isValidCredentials) {
				return res.status(401).json({ message: 'Invalid credentials' })
			}

			const jwtSecret = process.env.JWT_SECRET
			const expiresIn = '365d'
			const token = jwt.sign({ usernameOrEmail }, jwtSecret, { expiresIn })

			res.json({ token })
		} catch (error) {
			console.error('Error al procesar la solicitud:', error)
			res.status(500).json({ message: 'Error interno del servidor', error: error.message })
		}
	}
}
