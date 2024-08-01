import Movies from "./components/routes/Movies.tsx";
import Login from "./components/routes/LoginAndSignUpComponent.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./index.css";
import { APIContext } from "./components/APIContextProvider.tsx";
import LoginAndSignUp from "./components/routes/LoginAndSignUpComponent.tsx";
import NavBar from "./components/NavBar.tsx";
import { useContext, useState } from "react";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [userID, setUserID] = useState("");
  // const apiKey = useContext(API_KEY);
  // console.log("API key in app:", apiKey);
  return (
    <APIContext.Provider value={{ apiKey, setApiKey, userID, setUserID }}>
      <NavBar />
      <Outlet />
    </APIContext.Provider>
  );
}

export default App;
