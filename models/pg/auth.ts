import pg from 'pg'
import bcrypt from 'bcrypt'
import { IAuthModel, IAuthRequest, IAuthResponse, IDBConfig } from './authInterfaces.js'

const { Client } = pg

const Config: IDBConfig = {
	host: process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT) || 5432,
	database: process.env.DB_NAME || '',
	user: process.env.DB_USER || '',
	password: process.env.DB_PASSWORD || '',
}

const client = new Client(Config as IDBConfig)
await client.connect()

export class AuthModel implements IAuthModel {
	verifyCredentials({ usernameOrEmail, password }: IAuthRequest): Promise<IAuthResponse | null> {
		return AuthModel.verifyCredentials({ usernameOrEmail, password })
	}

	static async verifyCredentials({ usernameOrEmail, password }: IAuthRequest): Promise<IAuthResponse | null> {
		try {
			const isEmail = usernameOrEmail.includes('@')
			let query, user

			if (isEmail) {
				query = 'SELECT * FROM users WHERE email = $1'
				user = await client.query(query, [usernameOrEmail])
			} else {
				query = 'SELECT * FROM users WHERE username = $1'
				user = await client.query(query, [usernameOrEmail])
			}
			if (user.rows.length === 0) {
				return null
			}

			const storedPassword = user.rows[0].password
			const isPasswordValid = await bcrypt.compare(password, storedPassword)

			if (!isPasswordValid) {
				return null
			}

			return user.rows[0]
		} catch (err) {
			if (typeof err === 'object' && err !== null && 'message' in err) {
				throw new Error('Error al verificar las credenciales: ' + err.message)
			} else {
				throw new Error('Error al verificar las credenciales: ' + String(err))
			}
		}
	}
}