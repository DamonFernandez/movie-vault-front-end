import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { APIContext } from "./APIContextProvider";
import axios, { AxiosError } from "axios";
import "../styles/Login.css";
import { Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

alert("use the following creds to login: username: test, password: test1234");

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const usernameValue = watch("username") ?? "";
  const passwordValue = watch("password") ?? "";
  const { apiKey, setApiKey, userID, setUserID } = useContext(APIContext);

  function updateApiKeyState(newApiKey, newUserID) {
    console.log("Updating API key in context to:", newApiKey);
    setApiKey(newApiKey);
    setUserID(newUserID);
  }

  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    try {
      const resp = await requestApiKeyFromApi(data.username, data.password);
      updateApiKeyState(resp.apiKey, resp.userID);
      console.log("API key obtained:", resp.apiKey);
      try {
        console.log("Redirecting to App page");
        navigate("/");
      } catch (error) {
        console.error("Failed to redirect to app page:", error);
      }
    } catch (error) {
      console.error("Failed to get API key:", error);
      // Handle the error appropriately, maybe set an error state
    }
  };

  async function requestApiKeyFromApi(
    username,
    password
  ) {
    const URL = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/apikey?username=${username}&password=${password}`;

    try {
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Status code:", response.status);
      console.log("Api key obtained");
      console.log(response.data);
      return response.data;
    } catch (error) {
      const axiosError = error;
      console.log("Error occurred with request:");
      console.log(axiosError.response?.data);
      throw error;
    }
  }

  function validateLogin() {
    if (usernameValue.trim() === "") {
      console.log("Please enter a username");
    }
    if (passwordValue.trim() === "") {
      console.log("Please enter a password");
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="username">Username</label> */}
        <div>
          <input
            placeholder="Username"
            type="text"
            id="username"
            {...register("username", {
              required: "Please enter a username",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            placeholder="Password"
            type="password"
            id="password"
            {...register("password", {
              required: "Please enter a password",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" name="loginButton" onClick={validateLogin}>
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
