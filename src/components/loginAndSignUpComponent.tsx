import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import Login from "./Login";
import SignUp from "./SignUp";

function LoginAndSignUp() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // How this works is when api key is an blank string, keep showing this page
  // Once it changes to not be a blank string, then route to the main page
  // Have not implmented yet though

  function changeShowSignUpFlag(): void {
    setShowSignUp(!showSignUp);
  }

  function getApiKey(apiKey: string): void {
    console.log(apiKey);
    setApiKey(apiKey);
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
          <h2>Login</h2>
          <Login getApiKey={getApiKey} />
          <button onClick={changeShowSignUpFlag}>Sign Up</button>
        </>
      )}
    </>
  );
}

export default LoginAndSignUp;
