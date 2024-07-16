import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import Login from "./Login";

function Login() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username"></input>
      <label htmlFor="password">Password</label>
      <input type="text" name="password" id="password"></input>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
