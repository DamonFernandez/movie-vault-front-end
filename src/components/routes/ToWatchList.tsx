import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { APIContext } from "../APIContextProvider";
import "../../styles/toWatchList.css";

function ToWatchList({}) {
  const { apiKey, setApiKey } = useContext(APIContext);
  const [movies, setMovies] = useState([]);

  // setApiKey("90c714fc3d83ff7917a843fa94111761d8ece19dc372f7b984d82eab596e2f50");

  // DEF CHANGE THIS URL^^

  // const { apiKey } = useContext(API_KEY);
  // console.log(apiKey);

  useEffect(() => {
    // Set the API key only once when the component mounts
    setApiKey(
      "90c714fc3d83ff7917a843fa94111761d8ece19dc372f7b984d82eab596e2f50"
    );
  }, [setApiKey]);

  useEffect(() => {
    if (apiKey) {
      retrieveMoviesToWatch(apiKey);
    }
  }, [apiKey]);

  const retrieveMoviesToWatch = async (apiKey) => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });
      setMovies(response.data);
      console.log(movies);
    } catch (error) {
      console.error("Error occurred with request:", error);
    }
  };
  const URL =
    "https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/towatchlist/entries";
  return (
    <main>
      <h2> To Watch List</h2>
      <table>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Priority To Watch</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> MYHERO</td>
            <td> 1</td>
            <td> LOVED IT!</td>
          </tr>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>{movie.priority}</td>
              <td>{movie.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default ToWatchList;
