import Movies from "./routes/movies";

import { APIContextProvider } from "./components/APIContextProvider.tsx";
// import LoginAndSignUp from "./components/LoginAndSignUpComponent.tsx";
import Login from "./components/Login.tsx";

function App() {
  return (
    <APIContextProvider>
      <h1>MovieVault</h1>
      {/* <LoginAndSignUp /> */}
      <Login></Login>
    </APIContextProvider>
  );
}

export default App;
