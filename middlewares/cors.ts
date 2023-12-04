import cors from 'cors'

const whitelist: string[] = [
	'http://localhost:3000',
]

export const corsMiddleware = ({ acceptedOrigins = whitelist } = {}) => cors({
	origin: (origin, callback) => {
		if (origin && acceptedOrigins.includes(origin) || !origin) {
			return callback(null, true)
		}

		return callback(new Error('Not allowed by CORS'))
	}
})
