import axios from "axios";
import { APIContext } from "../components/APIContextProvider";
import { useContext } from "react";
const { apiKey } = useContext(APIContext);
export default function addToWatchList(movieId: number, userID: number, priority: number, notes: string) {
    axios.post(`https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/towatchlist/entries?x-api-key=${apiKey}`, {
        "movieID": movieId,
        "userID": userID,
        "priority": priority,
        "notes": notes
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("Error occurred with request:", error);
        });
    return;
}