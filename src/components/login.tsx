import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        // name="username"
        id="username"
        {...register("username", {
          required: "Please enter a username",
        })}
      ></input>
      <label htmlFor="password">Password</label>
      <input
        type="text"
        // name="password"
        id="password"
        {...register("password", {
          required: "Please enter an password",
        })}
      ></input>
      <button type="submit" name="loginButon">
        Login
      </button>
    </form>
  );
}

export default Login;
