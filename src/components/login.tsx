import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useForm } from "react-hook-form";

import axios from "axios";

function Login({ getApiKey }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const usernameValue: string = watch("username") ?? "";
  const passwordValue: string = watch("password") ?? "";
  // Still need to add styling to tell user what they need to do login is invalid
  const onSubmit = async (data) => {
    console.log("Form submitted", data);

    // getApiKey(requestApiKeyFromApi(usernameValue, passwordValue));
    const apiKey = await requestApiKeyFromApi(usernameValue, passwordValue);
    console.log(apiKey);
    getApiKey(apiKey);
  };

  async function requestApiKeyFromApi(
    username: string,
    password: string
  ): Promise<string> {
    const URL =
      "https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/apikey?username=test12&password=1234567";
    const UNAUTH_SERVER_CODE: number = 401;
    const BAD_SERVER_CODE_START_POINT: number = 299;
    try {
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Status code:", response.status);

      if (response.status === UNAUTH_SERVER_CODE) {
        throw new Error("Invalid Api Key");
      } else if (response.status > BAD_SERVER_CODE_START_POINT) {
        throw new Error(`Bad status code returned: ${response.status}`);
      }

      console.log("Api key obtained");
      const apiKey = response.data;
      console.log(apiKey);
      return apiKey;
    } catch (error) {
      console.log("Error occurred with request:");
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    if (usernameValue.trim() === "") {
      console.log("Please enter an username");
    }
    if (passwordValue.trim() === "") {
      console.log("Please enter an password");
    }
  }, [usernameValue, passwordValue]);

  // console.log(errors);

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
