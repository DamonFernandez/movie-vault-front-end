import { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";

function LoginAndSignUp() {
  const [showSignUp, setShowSignUp] = useState(false);
  // const [apiKey, setApiKey] = useState("");

  // How this works is when api key is an blank string, keep showing this page
  // Once it changes to not be a blank string, then route to the main page
  // Have not implmented yet though

  function changeShowSignUpFlag(): void {
    setShowSignUp(!showSignUp);
  }

  return (
    <>
      {showSignUp ? (
        <>
          <h2>Sign Up</h2>
          <SignUp />
          <button onClick={changeShowSignUpFlag}>Go to Login</button>
        </>
      ) : (
        <>
          <Login />
          <button onClick={changeShowSignUpFlag}>Sign Up</button>
        </>
      )}
    </>
  );
}

export default LoginAndSignUp;
