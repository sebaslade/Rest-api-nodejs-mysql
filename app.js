import express, { json } from 'express' // require -> commonJS 
import { createMovieRouter } from './routes/movies-routes.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({movieModel}) =>{
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    // Todas las rutas que estan en moviesRouter
    app.use('/movies', createMovieRouter({movieModel}))
    
    const PORT = process.env.PORT ?? 1234
    
    app.listen(PORT, () => {
        console.log(`server listening http://localhost:${PORT}`)
    })
}