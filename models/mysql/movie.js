import mysql from 'mysql2/promise'
/*
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '', // Coloca aquí tu contraseña si la tienes
    database: 'moviesdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
*/
const config = {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb',
}

const connection = await mysql.createConnection(config)

const formatId = (id) => {
    return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16, 4)}-${id.substr(20)}`;
};

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            // obtener los id's de los generos de la base de datos usando el name de la tabla genre
            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) =?;',
                [lowerCaseGenre]
            )

            // no se encontro el genero
            if (genres.length === 0) return []

            const [{ id }] = genres

            // Obtener todas las películas asociadas con ese género
            const [movies] = await connection.query(
                `SELECT HEX(movie.id) as id, movie.title,movie.year,movie.director,movie.duration,movie.poster,movie.rate FROM movie
                INNER JOIN movie_genre ON movie.id = movie_genre.movie_id
                WHERE movie_genre.genre_id = ?;`,
                [id]
            )

            return movies
        }

        const [movies] = await connection.query(
            'SELECT HEX(id) AS id, title, year, director, duration, poster, rate FROM movie;'
        )

        return movies
    }

    static async getById({ id }) {

        const [movies] = await connection.query(
            `SELECT HEX(id) id, title, year, director, duration, poster, rate 
             FROM movie 
             WHERE id = UNHEX(?);`,
            [id]
        )

        if (movies.length === 0) return null

        return movies[0]
    }

    static async create({ input }) {
        const {
            genre: genreInput, // genre es un arreglo
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        // Crear conexion de los generos y peliculas
        
        // Creación de una nueva película
        const [uuidResult] = await connection.query('SELECT UNHEX(REPLACE(UUID(), "-", "")) AS uuid;');
        const [{ uuid }] = uuidResult;
        const uuidHex = uuid.toString('hex').toUpperCase();

        console.log(uuid)

        try {
            await connection.query(
                `INSERT INTO movie(id, title, year, director, duration, poster, rate)
                 VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [uuid, title, year, director, duration, poster, rate]
            );
        } catch (e) {
            // puede enviarle información sensible
            console.log('Error al crear la película', e)
            // IDEAL --> throw new Error('Error al crear la película')
            // enviar la traza a un servicio interno
            // sendLog(e)
        }

        const [movies] = await connection.query(
            `SELECT HEX(id) id, title, year, director, duration, poster, rate 
             FROM movie
             WHERE id = UNHEX(REPLACE((?), '-', ''));`,
            [uuidHex]
        );

        //console.log(result)
        return movies[0]
    }

    static async delete({ id }) {
        // PENDIENTE: ELIMINAR PELÍCULA
    }

    static async update({ id, input }) {
        // PENDIENTE: ACTUALIZAR PELÍCULA
    }
}

/*
//const connection = await config.getConnection()
try {
    const [rows, fields] = await connection.query(
        'SELECT UUID() AS id, title, year, director, duration, poster, rate FROM movie;'
    );
    console.log(rows)
} catch (error) {
    console.error('Error al ejecutar la consulta:', error);
} finally {
    connection.release()
}
*/