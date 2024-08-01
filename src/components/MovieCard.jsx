import "../styles/movie-card.css";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { APIContext } from "./APIContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function MovieCard({ movie }) {
    const navigate = useNavigate();
    const { apiKey, userID } = useContext(APIContext);
    const [added, setAdded] = useState(false);
    if (!apiKey) {
        navigate("/");
    }


    const quickAddToWatchList = () => {
        console.log("Adding to watchlist");
        console.log(userID);
        axios.put(`https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/towatchlist/entry?x-api-key=${apiKey}`, {
            "userID": userID,
            "movieID": movie.movieID,
            "priority": 1,
            "notes": ""
        })
            .then((response) => {
                setAdded(true);
            })
            .catch((error) => {
                console.error("Error occurred with request:", error);
            });
    }
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
            <button className="quickAddBtn" onClick={quickAddToWatchList}>+ToWatch</button>
            <div className={mouseIn ? "movie-info" : " movie-info hidden"}>
                <div className="additional-info" >
                    <p>{movie.release_date}</p>
                    <p>{movie.vote_average}</p>
                </div>
            </div>
            <div className={added ? "movie-info" : " movie-info hidden"}>
                <div className="additional-info" >
                    <p>Added to Watchlist</p>
                </div>
            </div>
        </div>
    );
}