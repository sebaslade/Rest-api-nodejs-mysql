import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://movies.com',
    'https://rest-api-deploy-dev-hgdf.3.us-1.fl0.io'
]

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }
        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
})