import "../styles/movie-card.css";
import { Movie } from "../types";
interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="movie-card">
            <img src={movie.poster} alt={movie.title} width={200} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
            </div>
        </div>
    );
}