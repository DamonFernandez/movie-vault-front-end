import axios from "axios";

function ToWatchList({}) {
  // Assume that I have an api key, I will add it later
  const URL = `https://loki.trentu.ca/~damonfernandez/3430/cois-3430-2024su-a2-Blitzcranq/api/?username=${username}&password=${password}`;
  // DEF CHANGE THIS URL^^

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
