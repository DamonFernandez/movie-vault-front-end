import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { APIContext } from "../APIContextProvider";
// import "../../styles/";

function ToWatchList({}) {
  const { apiKey, setApiKey } = useContext(APIContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (apiKey) {
      console.log(apiKey);
      retrieveMoviesToWatch(apiKey);
    }
  }, [apiKey]);
  const URL_FOR_TO_WATCH_LIST_ENTRIES = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/towatchlist/entries?x-api-key=${apiKey.apiKey}`;

  const retrieveMoviesToWatch = async (apiKey) => {
    try {
      const response = await axios.get(URL_FOR_TO_WATCH_LIST_ENTRIES, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMovies(response.data);
      // addMovieNamesToMoviesToWatchObj();

      console.log("lOOK HJERE");

      console.log(movies);
    } catch (error) {
      console.error("Error occurred with request:", error);
    }
  };

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
            <tr key={movie.toWatchListID}>
              <td>{movie.title}</td>
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
