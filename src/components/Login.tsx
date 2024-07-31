import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { APIContext } from "./APIContextProvider";
import axios, { AxiosError } from "axios";
import "../styles/Login.css";
import { Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  username: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const usernameValue: string = watch("username") ?? "";
  const passwordValue: string = watch("password") ?? "";

  const { apiKey, setApiKey } = useContext(APIContext);

  function updateApiKeyState(newApiKey: string) {
    console.log("Updating API key in context to:", newApiKey);
    setApiKey(newApiKey);
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Form submitted", data);
    try {
      const apiKey = await requestApiKeyFromApi(data.username, data.password);
      updateApiKeyState(apiKey);
      console.log("API key obtained:", apiKey);
      try {
        console.log("Redirecting to App page");
        navigate("/");
      } catch (error) {
        console.error("Failed to redirect to movies page:", error);
      }
    } catch (error) {
      console.error("Failed to get API key:", error);
      // Handle the error appropriately, maybe set an error state
    }
  };

  async function requestApiKeyFromApi(
    username: string,
    password: string
  ): Promise<string> {
    const URL = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/apikey?username=${username}&password=${password}`;

    try {
      const response = await axios.get<string>(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Status code:", response.status);
      console.log("Api key obtained");
      console.log(response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
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
