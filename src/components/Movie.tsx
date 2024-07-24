import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Movie_detailed } from "../types";
import axios from "axios";



export default function Movie() {
    const params = useParams();
    const movieID = params.id;
    const [movie, setMovie] = useState<Movie_detailed | null>();
    useEffect(() => {
        axios.get("https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/" + movieID)
            .then((response) => {
                setMovie(response.data);
            })
            .catch((error) => {
                console.error("Error fetching movie:", error);
            });
    }, []);

    return (
        <div className="movie-details">
            <h1>{movie?.title}</h1>
            <img src={movie?.poster} alt={movie?.title} />
            <p>{movie?.overview}</p>
            <p>Release Date: {movie?.release_date}</p>
            <p>Rating: {movie?.vote_average}</p>
            <p>Genres: {movie?.genres}</p>
            <p>Original Language: {movie?.original_language}</p>
            <p>Runtime: {movie?.runtime} minutes</p>
            <p>Tagline: {movie?.tagline}</p>
            <p>Production Companies: {movie?.production_companies}</p>
            <a href={movie?.homepage} target="_blank" rel="noreferrer">Homepage</a>

        </div>
    );
}