import { useForm } from "react-hook-form";

function SignUp() {
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
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        // name="email"
        {...register("email", {
          required: "Please enter a email",
        })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        // name="password"
        id="password"
        {...register("password", {
          required: "Please enter a password",
          minLength: {
            message: "Minimum password length is 8 characters",
            value: 8,
          },
        })}
      ></input>

      {/* <label htmlFor="verifyPassword">Verify Password</label>
      <input type="text" name="verifyPassword" id="verifyPassword"
      ></input> */}
      <button type="submit" name="signUpButton">
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
