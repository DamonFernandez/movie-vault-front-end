import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { APIContext } from "./APIContextProvider";
import "../../styles/toWatchList.css";

function ToWatchListForm({movieName, entryId, priorityToWatch, Notes}) {
  const { apiKey, setApiKey } = useContext(APIContext);


  //   setApiKey("90c714fc3d83ff7917a843fa94111761d8ece19dc372f7b984d82eab596e2f50");

  //   useEffect(() => {
  //     // Set the API key only once when the component mounts
  //     setApiKey(
  //       "90c714fc3d83ff7917a843fa94111761d8ece19dc372f7b984d82eab596e2f50"
  //     );
  //   }, [setApiKey]);


  const {priority, setPriority} = useState();
  const {notes, setNotes} = useState(Notes);


  let URL = "https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/towatchlist/entries/";
  let changedEntryObject = {
    // "entryId" : entryId,
    "priorityToWatch" : priorityToWatch,
    "notes" : notes,
  }
  return (
    <section> 
      <h2> Modify {movieName} Entry</h2>
        <form action={URL + entryId } method="PUT"></form>
            <label htmlFor="priority"></label>
            <input type="number" name="priority" id="priority" value />
</section>
  
}

export default ToWatchList;
