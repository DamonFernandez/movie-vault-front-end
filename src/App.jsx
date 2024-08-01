
import { Outlet } from "react-router-dom";

import "./index.css";
import { APIContext } from "./components/APIContextProvider.jsx";

import NavBar from "./components/NavBar.jsx";
import { useState } from "react";

function App() {
  console.log(APIContext)
  const [apiKey, setApiKey] = useState("");
  const [userID, setUserID] = useState("");

  return (
    <APIContext.Provider value={{ apiKey, setApiKey, userID, setUserID }}>
      <NavBar />
      <Outlet />
    </APIContext.Provider>
  );
}
export default App;
