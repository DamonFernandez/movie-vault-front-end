import { useEffect, useState } from "react";
import MovieList from "../components/MovieList.tsx";
import { Movie } from "../types.tsx";
export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        fetch("https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/")
            .then((response) => response.json())
            .then((data) => setMovies(data));
    }, []);
    return (
        <div>
            <p>NAVBAR</p>
            <p>FILTERS</p>
            <MovieList movies={movies} />
        </div>
    );
}