import MovieCard from './MovieCard.tsx'
import { Movie } from '../types.tsx'
import "../styles/movie-list.css";
interface MovieListProps {
    movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.movieID} movie={movie} />
            ))}
        </div>
    )
}