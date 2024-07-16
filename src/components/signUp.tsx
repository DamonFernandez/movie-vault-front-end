import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function SignUp() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username"></input>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="text" name="password" id="password"></input>
      <label htmlFor="verifyPassword">Verify Password</label>
      <input type="text" name="verifyPassword" id="verifyPassword"></input>
      <button type="submit">Login</button>
    </form>
  );
}

export default SignUp;
