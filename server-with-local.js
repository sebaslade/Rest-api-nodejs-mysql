import { createApp } from './app.js'

import { MovieModel } from './models/local-files-system/movie-model.js'

createApp({movieModel: MovieModel})