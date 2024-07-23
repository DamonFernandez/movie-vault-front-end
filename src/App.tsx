import Movies from "./routes/movies";

import "./styles/App.css";
import { APIContextProvider } from "./components/APIContextProvider.tsx";
import LoginAndSignUp from "./components/LoginAndSignUpComponent.tsx";
import { LoginAndSignUpProps } from "./types.tsx";
import { useState } from "react";

function App() {
  return (
    <APIContextProvider>
      <h1>MovieVault</h1>
      <LoginAndSignUp />
    </APIContextProvider>
  );
}

export default App;
