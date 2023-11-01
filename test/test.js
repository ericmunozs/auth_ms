import { describe, it } from 'node:test'
import assert from 'assert'
import 'dotenv/config'

import { AuthController } from '../controllers/auth.js'
import { AuthModel } from '../models/pg/auth.js'

describe('Auth microservice', () => {
	it('should authenticate user and generate a jwt token', async () => {
		const req = {
			body: {
				usernameOrEmail: 'usuario123',
				password: 'hash_de_contraseña',
			}
		}
		let tokenResult

		const res = {
			json: (data) => {
				console.log({ token: data.token })
				tokenResult = data.token
			},
			status: (code) => {
				console.log(`status code: ${code}`)
				return res
			},
		}
		const authController = new AuthController({ authModel: AuthModel })

		await authController.login(req, res)

		assert.ok(tokenResult, 'token should be defined')
	})
})
