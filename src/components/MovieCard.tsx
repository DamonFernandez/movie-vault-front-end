import "../styles/movie-card.css";
import { useEffect, useState } from "react";
import { Movie } from "../types";
import { Link } from "react-router-dom";
import { APIContext } from "./APIContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import addToWatchList from "../modules/addToWatchList";
interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    // const navigate = useNavigate();
    // const { apiKey, userID } = useContext(APIContext);
    // if (!apiKey) {
    //     navigate("/");
    // }

    // const quickAddToWatchList = () => {
    //     addToWatchList(movie.movieID, userID, 3, "");
    // }
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
            {/* <button className="quickAddBtn" onClick={quickAddToWatchList}>+ToWatch</button> */}
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