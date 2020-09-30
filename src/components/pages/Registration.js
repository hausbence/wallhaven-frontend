import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Registration = () => {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {
    Axios.post("http://localhost:8080/register", {
      name: values.username,
      password: values.password,
      email: values.email,
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
        setTimeout(() => {
            history.push("/login")
        }, 1000)
    );
    console.log(values);
  };

  let content = (
    <React.Fragment>
      <div className="form">
        <h2 className="loginHeader">Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input-style"
            name="email"
            type="email"
            placeholder="Email"
            ref={register({
              required: true,
            })}
          />
          {errors.email && errors.email.message}

          <input
            className="input-style"
            name="username"
            placeholder="Username"
            ref={register({
              required: true,
              minLength: 2,
              maxLength: 16,
            })}
          />
          {errors.username && errors.username.message}
          <input
            className="input-style"
            name="password"
            type="password"
            placeholder="Password"
            ref={register({
              required: true,
              minLength: 2,
              maxLength: 16,
            })}
          />
          {errors.password && errors.password.message}

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
  return content;
};

export default Registration;
