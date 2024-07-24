import Movies from "./components/routes/Movies.tsx";
import Login from "./components/routes/LoginAndSignUpComponent.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { APIContextProvider } from "./components/APIContextProvider.tsx";
import LoginAndSignUp from "./components/routes/LoginAndSignUpComponent.tsx";


function App() {
  const apiKey = "no key";

  return (
    <APIContextProvider>
      {apiKey.toLowerCase() === "no key provided yet" ? <LoginAndSignUp /> : <Movies />}
    </APIContextProvider>
  );
}

export default App;
