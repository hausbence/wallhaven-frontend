import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Registration = () => {
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
      }
    );
    console.log(values);
  };

  //   pattern: {
  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //     message: "invalid email address",

  // validate: (value) => value !== "admin" || "Nice try!",
  //   }

  let content = (
    <React.Fragment>
        <h2 className="loginHeader">Registration</h2>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
              <input className="input-style"
              name="email"
              type="email"
              placeholder="Email"
              ref={register({
                required: true,
              })}
            />
            {errors.email && errors.email.message}

            <input className="input-style"
              name="username"
              placeholder="Username"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 16,
              })}
            />
            {errors.username && errors.username.message}
            <input className="input-style"
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

            <button type="submit" className="button">Submit</button>
      </form>
    </div>
    </React.Fragment>
  );
  return content;
};

export default Registration;
