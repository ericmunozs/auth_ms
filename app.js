import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createAuthRouter } from './routes/auth.js'
import 'dotenv/config'

export const createApp = ({ authModel }) => {
	const app = express()
	app.use(express.json())
	app.use(corsMiddleware())
	app.disable('x-powered-by')

	app.use('/login', createAuthRouter({ authModel }))

	const SERVER_PORT = process.env.SERVER_PORT

	app.listen(SERVER_PORT, () => {
		console.log(`server listening on port http://localhost:${SERVER_PORT}`)
	})
}
