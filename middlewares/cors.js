import cors from 'cors'

const whitelist = [
	'http://localhost:3000',
]

export const corsMiddleware = ({ acceptedOrigins = whitelist } = {}) => cors({
	origin: (origin, callback) => {
		if (acceptedOrigins.includes(origin) || !origin) {
			return callback(null, true)
		}

		return callback(new Error('Not allowed by CORS'))
	}
})
