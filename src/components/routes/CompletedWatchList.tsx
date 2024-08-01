import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { APIContext } from "../APIContextProvider";
import { useNavigate } from "react-router-dom";
// import "../../styles/";

function CompletedWatchList() {
  const { apiKey, setApiKey } = useContext(APIContext);
  const [movies, setMovies] = useState([]);
  const naviagte = useNavigate();

  useEffect(() => {
    if (apiKey) {
      console.log(apiKey);
      retrieveCompletedMovies(apiKey);
    } else {
      naviagte("/");
    }
  }, [apiKey]);
  const URL_TO_GET_COMPLETED_WATCH_LIST_ENTRIES = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/completedwatchlist/entries?x-api-key=${apiKey}`;

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
    } catch (error) {
      console.error("Error occurred with request:", error);
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
              <td>{movie.rating}</td>
              <td>{movie.notes}</td>
              <td>{movie.dateStarted}</td>
              <td>{movie.dateLastWatched}</td>
              <td>{movie.numOfTimesWatched}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default CompletedWatchList;
