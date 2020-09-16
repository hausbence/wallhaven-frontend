import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import './Login.css';

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["email", "password"]);
  const onSubmit = (values) => {
    Axios.get(
      `http://localhost:8080/login/${values.email}/${values.password}`
    ).then((r) => setLogin(r.data));
    console.log(values);
    if (login) {
      setCookie("email", values.email, { path: "/" });
      setCookie("password", values.password, { path: "/" });
    }
  };
  if (login) {
    console.log(cookies);
  }

    return (
        <React.Fragment>
            <h2 className="loginHeader">Login</h2>
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
};

export default Login;
