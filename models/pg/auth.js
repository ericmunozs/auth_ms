import pg from 'pg'
import bcrypt from 'bcrypt'

const { Client } = pg

const Config = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
}

const client = new Client(Config)
await client.connect()

export class AuthModel {
	static async verifyCredentials({ usernameOrEmail, password }) {
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

			const storedPassword = user.rows[0].password;
			const isPasswordValid = await bcrypt.compare(password, storedPassword);

			if (!isPasswordValid) {
				return null
			}

			return user.rows[0]
		} catch (err) {
			throw new Error('Error al verificar las credenciales: ' + err.message)
		}
	}
}