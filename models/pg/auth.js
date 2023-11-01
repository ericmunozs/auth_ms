import pg from 'pg'

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
			let query
			if (isEmail) {
				query = 'SELECT * FROM users WHERE email = $1 AND password = $2'
			} else {
				query = 'SELECT * FROM users WHERE username = $1 AND password = $2'
			}
			const res = await client.query(query, [usernameOrEmail, password])

			if (res.rows.length === 0) {
				return null
			}

			return res
		} catch (err) {
			throw new Error('Error al verificar las credenciales: ' + err.message)
		}
	}
}