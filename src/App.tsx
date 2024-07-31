import Movies from "./components/routes/Movies.tsx";
import Login from "./components/routes/LoginAndSignUpComponent.tsx";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import "./styles/App.css";
import { APIContext } from "./components/APIContextProvider.tsx";
import LoginAndSignUp from "./components/routes/LoginAndSignUpComponent.tsx";
import NavBar from "./components/NavBar.tsx";
import { useContext, useState } from "react";

function App() {
  const [apiKey, setApiKey] = useState<string>("");
  // const apiKey = useContext(API_KEY);
  // console.log("API key in app:", apiKey);
  return (
    <APIContext.Provider value={{ apiKey, setApiKey }}>
      <NavBar />
      <Outlet />
    </APIContext.Provider>
  );
}

export default App;
