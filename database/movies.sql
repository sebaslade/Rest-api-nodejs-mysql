-- Creación de la base de datos:
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

-- usar
USE moviesdb;

-- Crear Tabla Movies:
CREATE TABLE movie(
	id BINARY(16) PRIMARY KEY DEFAULT (UUID()),
    title varchar(255) NOT NULL,
    year INT NOT NULL,
    director varchar(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2,1) UNSIGNED NOT NULL
);

-- CREAR TABLA PARA EL GENERO
CREATE TABLE genre(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- CREAR TABLA MOVIE_GENERE
CREATE TABLE movie_genre(
	movie_id BINARY(16) REFERENCES movies(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY(movie_id, genre_id)
);

INSERT INTO genre(name) VALUES
('Drama'),
('Action'),
('Sci-Fi'),
('Crime'),
('Adventure'),
('Romance');

-- INSERTANDO DATOS PARA LA TABLA MOVIE
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), "Inception",2010,"Christopher Nolan",148,"https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg",8.8),
(UNHEX(REPLACE(UUID(), '-', '')), "The Shawshank Redemption",1994,"Frank Darabont",142,"https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",9.3),
(UNHEX(REPLACE(UUID(), '-', '')), "The Dark Knight",2008,"Christopher Nolan",152,"https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg",9.0);

SELECT * FROM movie;

-- INSERTANDO DATOS PARA LA TABLA MOVIE_GENRE
INSERT INTO movie_genre(movie_id, genre_id)
VALUES
	((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
    ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action'));
    
SELECT HEX(id) AS id, title, year, director, duration, poster, rate FROM movie;

SELECT * FROM genre;

SELECT movie.id uuid, movie.title,movie.year,movie.director,movie.duration,movie.poster,movie.rate FROM movie
INNER JOIN movie_genre ON movie.id = movie_genre.movie_id
WHERE movie_genre.genre_id = 2;

SELECT id, title, year, director, duration, poster, rate
FROM movie;

SELECT HEX(id) id, title, year, director, duration, poster, rate 
FROM movie 
WHERE id = UNHEX('2F8161C1DC0911EE93851C1B0DE3D1BB');

SELECT HEX(id) id, title, year, director, duration, poster, rate 
FROM movie
WHERE id = UNHEX(REPLACE(('FD60F6D7DC0911EE93851C1B0DE3D1BB'), '-', ''));

SELECT name
FROM genre WHERE id = 1;

-- SELECT HEX(REPLACE(UUID(), '-', ''))
