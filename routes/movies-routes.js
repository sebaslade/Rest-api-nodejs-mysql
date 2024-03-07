import { Router } from 'express'
//import { MovieModel } from '../models/mysql/movie.js'
import { MovieController } from '../controllers/movies-controller.js'

export const createMovieRouter = ({movieModel}) =>{
    const moviesRouter = Router()
    
    const movieController = new MovieController({ movieModel })
    
    moviesRouter.get('/', movieController.getAll)
    moviesRouter.post('/', movieController.create)
    
    moviesRouter.get('/:id', movieController.getById)
    moviesRouter.delete('/:id', movieController.delete)
    moviesRouter.patch('/:id', movieController.update)

    return moviesRouter
}