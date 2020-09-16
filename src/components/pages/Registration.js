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

    const StyledRegistration = styled.div`
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      flex-flow: column;
      width: 200px;
      height: 200px;
      padding: 50px;
      margin: 0 auto;
      border: 1px solid lightgray;
      background: #88888;
      
    
      h2 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
      }

      button {
        background: #aaaaaa;
        color: #fff;
        transform: translateX(23%);
        padding: 10px;
        margin: 5px;
        width: 100px;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
      }
      
      button:hover {
        background-color: #888888;
      }
  `;

    const StyledInput = styled.input`
      border: 1px solid #000;
      padding: 10px;
      margin: 5px;
      width: 150px;
      box-sizing: border-box;
    `;

  let content = (
    <React.Fragment>
        <h2 className="loginHeader">Registration</h2>
        <StyledRegistration>
          <form onSubmit={handleSubmit(onSubmit)}>
              <StyledInput
              name="email"
              type="email"
              placeholder="Email"
              ref={register({
                required: true,
              })}
            />
            {errors.email && errors.email.message}

            <StyledInput
              name="username"
              placeholder="Username"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 16,
              })}
            />
            {errors.username && errors.username.message}
            <StyledInput
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

            <button type="submit">Submit</button>
      </form>
    </StyledRegistration>
    </React.Fragment>
  );
  return content;
};

export default Registration;
