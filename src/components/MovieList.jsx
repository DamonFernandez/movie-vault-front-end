import MovieCard from './MovieCard.jsx'

import "../styles/movie-list.css";


export default function MovieList({ movies }) {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.movieID} movie={movie} />
            ))}
        </div>
    )
}