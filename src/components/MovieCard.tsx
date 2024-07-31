import "../styles/movie-card.css";
import { useEffect, useState } from "react";
import { Movie } from "../types";
import { Link } from "react-router-dom";
interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {

    const [mouseIn, setMouseIn] = useState(false);
    return (

        <div className="movie-card"
        >
            <Link to={"/movie/" + movie.movieID}>
                <img src={movie.poster} alt={movie.title} width={185} onMouseEnter={
                    () => {
                        setMouseIn(true);
                    }}
                    onMouseLeave={
                        () => {
                            setMouseIn(false);
                        }}
                />
            </Link>
            <h3>{movie.title}</h3>
            <button className="quickAddBtn">+ToWatch</button>
            <button className="quickAddBtn">+Complete</button>
            <div className={mouseIn ? "movie-info" : " movie-info hidden"}>
                <div className="additional-info" >
                    <p>{movie.release_date}</p>
                    <p>{movie.vote_average}</p>
                    <p>{movie.genres}</p>
                    <button id="addToList" className="addToList" onClick={() => {
                        console.log("Added to watchlist");
                    }}
                        onMouseEnter={
                            () => {
                                setMouseIn(true);
                            }}
                        onMouseLeave={
                            () => {
                                setMouseIn(false);
                            }}

                    >+</button>
                </div>
            </div>
        </div>
    );
}