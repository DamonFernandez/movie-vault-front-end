import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { APIContext } from "../APIContextProvider";
import { useNavigate } from "react-router-dom";
import "../../styles/completedWatchList.css";
function CompletedWatchList() {
  const { apiKey, setApiKey } = useContext(APIContext);
  const [movies, setMovies] = useState([]);
  const naviagte = useNavigate();
  const [ratings, setRatings] = useState({});
  useEffect(() => {
    if (apiKey) {
      console.log(apiKey);
      retrieveCompletedMovies(apiKey);
    } else {
      naviagte("/");
    }
  }, [apiKey]);
  const URL_TO_GET_COMPLETED_WATCH_LIST_ENTRIES = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/completedwatchlist/entries?x-api-key=${apiKey}`;
  const URL_TO_UPDATE_RATING = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/completedwatchlist/entries`;
  const retrieveCompletedMovies = async (apiKey) => {
    try {
      const response = await axios.get(
        URL_TO_GET_COMPLETED_WATCH_LIST_ENTRIES,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const respMovies = response.data;

      setMovies(respMovies);
      console.log("Movies retrieved:", respMovies);
      const newRatings = { ...ratings };
      respMovies.forEach((movie) => {
        if (!newRatings[movie.completedWatchListID]) {
          newRatings[movie.completedWatchListID] = movie.rating;
        }
      });
      setRatings(newRatings);
    } catch (error) {
      console.error("Error occurred with request:", error);
    }
  };
  const handleRatingChange = (completedWatchListID, value) => {
    setRatings((prev) => ({ ...prev, [completedWatchListID]: parseInt(value) }));
  };

  const updateRating = async (completedWatchListID) => {
    const newRating = ratings[completedWatchListID];
    if (!newRating) return;

    try {
      const response = await axios.patch(
        `${URL_TO_UPDATE_RATING}/${completedWatchListID}/rating?x-api-key=${apiKey}`,
        { rating: parseInt(newRating) }, // Ensure priority is sent as a number
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (response.status === 200) {
        console.log(response);
        console.log("Rating updated successfully");
        // Update local state
        setMovies(
          movies.map((movie) =>
            movie.completedWatchListID === completedWatchListID
              ? { ...movie, rating: parseInt(newRating) }
              : movie
          )
        );
      } else {
        console.error("Failed to update rating:", response);
      }
    } catch (error) {
      console.error("Error updating rating :", error);
    }
  };
  return (
    <main>
      <h2> Completed Watch List</h2>
      <table>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Rating</th>
            <th>Notes</th>
            <th>Date Started</th>
            <th>Date Last Watched</th>
            <th>Number of Times Watched</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          {movies.map((movie) => (
            <tr key={movie.completedWatchListID}>
              <td>{movie.title}</td>
              <td><input type="number" value={ratings[movie.completedWatchListID] || movie.rating}
                onChange={(e) =>
                  handleRatingChange(movie.completedWatchListID, e.target.value, movie.movieID)}></input> </td>
              <td>{movie.notes}</td>
              <td>{movie.dateStarted}</td>
              <td>{movie.dateLastWatched}</td>
              <td>{movie.numOfTimesWatched}</td>
              <button
                type="button"
                onClick={() => updateRating(movie.completedWatchListID)}
              >
                Update Rating
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default CompletedWatchList;
