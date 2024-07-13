import "../styles/moive-card.css";
interface Movie {
    id: number;
    title: string;
    year: number;
    poster: string;
}

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