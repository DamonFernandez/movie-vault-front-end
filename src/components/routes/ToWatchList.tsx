import axios from "axios";
import { useContext } from "react";
import { APIContext } from "../APIContextProvider";

function ToWatchList({ }) {
  // Assume that I have an api key, I will add it later
  const URL = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/entries/api_key=`;

  // DEF CHANGE THIS URL^^

  const { apiKey } = useContext(APIContext);
  console.log(apiKey);

  function retrieveMoviesToWatch(apiKey) {
    const moviesToWatchListJson = axios
      .get(URL)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("Error occured with request:");
        console.log(error);
        throw error;
      });
  }

  return (
    <table>
      <thead>
        <th> Movie Cover </th>
        <th> Movie Name </th>
        <th> Movie Priority To Watch </th>
        <th> Notes </th>
      </thead>
    </table>
  );
}

export default ToWatchList;
