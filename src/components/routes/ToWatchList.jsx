import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { APIContext } from "../APIContextProvider";
import { useNavigate } from "react-router-dom";
// import "../../styles/";

function ToWatchList({ }) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  const { apiKey, setApiKey, userID } = useContext(APIContext);
  const [movies, setMovies] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [priorities, setPriorities] = useState({});
  const naviagte = useNavigate();

  const addToCompletedList = async (toWatchListID, movieID, notes, date) => {
    try {
      const response = await axios.post(
        `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/completedwatchlist/entries?x-api-key=${apiKey}`,
        {
          userID: userID,
          movieID: movieID,
          rating: 0,
          notes: notes,
          dateStarted: date,
          dateLastWatched: date,
          numOfTimesWatched: 1,
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      if (response.status === 201) {
        console.log("Added to completed list successfully");
        console.log(response);
        return toWatchListID;
      } else {
        console.error("Failed to add to completed list:", response);
      }
    } catch (error) {
      console.error("Error adding to completed list:", error);
    }
  };


  const deleteFromToWatchList = async (toWatchListID) => {
    try {
      const response = await axios.delete(
        `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/towatchlist/entries/${toWatchListID}?x-api-key=${apiKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {

        console.log("Deleted successfully");
        console.log(response);
        setMovies(movies.filter((movie) => movie.toWatchListID !== toWatchListID));
        return toWatchListID;

      } else {
        console.error("Failed to delete:", response);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };


  const sortMoviesByPriority = (movies) => {
    movies.sort((a, b) => {
      return a.priority - b.priority;
    });
  };

  useEffect(() => {
    if (apiKey) {
      console.log(apiKey);
      retrieveMoviesToWatch(apiKey, sorted);
    } else {
      naviagte("/");
    }
  }, [apiKey, sorted]);
  const URL_TO_GET_TO_WATCH_LIST_ENTRIES = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/towatchlist/entries?x-api-key=${apiKey}`;
  const URL_TO_UPDATE_PRIORITY = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/towatchlist/entries`;

  const retrieveMoviesToWatch = async (apiKey, sorted = false) => {
    try {
      const response = await axios.get(URL_TO_GET_TO_WATCH_LIST_ENTRIES, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respMovies = response.data;

      sorted && sortMoviesByPriority(respMovies);
      setMovies(respMovies);

      // Preserve local changes to priorities
      const newPriorities = { ...priorities };
      respMovies.forEach((movie) => {
        if (!newPriorities[movie.toWatchListID]) {
          newPriorities[movie.toWatchListID] = movie.priority;
        }
      });
      setPriorities(newPriorities);

      console.log("Movies retrieved:", respMovies);
    } catch (error) {
      console.error("Error occurred with request:", error);
    }
  };

  const handlePriorityChange = (toWatchListID, value) => {
    setPriorities((prev) => ({ ...prev, [toWatchListID]: parseInt(value) }));
  };

  const updatePriority = async (toWatchListID) => {
    const newPriority = priorities[toWatchListID];
    if (!newPriority) return;

    try {
      const response = await axios.patch(
        `${URL_TO_UPDATE_PRIORITY}/${toWatchListID}/priority?x-api-key=${apiKey}`,
        { priority: parseInt(newPriority) }, // Ensure priority is sent as a number
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (response.status === 200) {
        console.log(response);
        console.log("Priority updated successfully");
        // Update local state
        setMovies(
          movies.map((movie) =>
            movie.toWatchListID === toWatchListID
              ? { ...movie, priority: parseInt(newPriority) }
              : movie
          )
        );
      } else {
        console.error("Failed to update priority:", response);
      }
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };
  return (
    <main>
      <h2> To Watch List</h2>
      <button onClick={() => setSorted(!sorted)}>Sort by Priority</button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Movie ID</th>
            <th>Movie Name</th>
            <th>Priority To Watch</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.toWatchListID}>
              <td><button type="button" style={{ backgroundColor: "maroon" }} onClick={() => { deleteFromToWatchList(movie.toWatchListID) }}>x</button></td>
              <td>{movie.toWatchListID}</td>
              <td>{movie.title}</td>
              <td>
                <input
                  type="number"
                  value={priorities[movie.toWatchListID] || movie.priority}
                  onChange={(e) =>
                    handlePriorityChange(movie.toWatchListID, e.target.value)
                  }
                />
              </td>
              <td>{movie.notes}</td>
              <td>
                <button
                  type="button"
                  onClick={() => updatePriority(movie.toWatchListID)}
                >
                  Update Priority
                </button>
              </td>
              <td>
                <button type="button" style={{ backgroundColor: "green" }}
                  onClick={() => {
                    addToCompletedList(deleteFromToWatchList(movie.toWatchListID), movie.movieID, movie.notes, today);
                  }}>Completed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main >
  );
}

export default ToWatchList;
