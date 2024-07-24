import Movies from "./routes/movies";

import "./styles/App.css";
import { APIContextProvider } from "./components/APIContextProvider.tsx";
import LoginAndSignUp from "./components/LoginAndSignUpComponent.tsx";


function App() {
  return (
    <APIContextProvider>
      <h1>MovieVault</h1>
      <LoginAndSignUp />
    </APIContextProvider>
  );
}

export default App;
