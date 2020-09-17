import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useCookies } from "react-cookie";
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [cookies1, removeCookie] = useCookies([
    "email",
    "password",
    "id",
    "username",
  ]);
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies([
    "id",
    "email",
    "password",
    "username",
  ]);
  const onSubmit = (values) => {
    document.getElementById("email").setAttribute("readonly", true);
    document.getElementById("password").setAttribute("readonly", true);
    Axios.get(
      `http://localhost:8080/login/${values?.email}/${values?.password}`
    )
      .then((response) => {
        setLogin(response.data);
        return Axios.get(`http://localhost:8080/id/${values.email}`);
      })
      .then((response) => {
        setId(response.data);
        return Axios.get(`http://localhost:8080/username/${values.email}`);
      })
      .then((response) => {
        setUsername(response.data);
      })
      .catch((error) => console.log(error.response));

    if (login) {
      setCookie("id", id, { path: "/" });
      setCookie("email", values.email, { path: "/" });
      setCookie("password", values.password, { path: "/" });
      setCookie("username", username, { path: "/" });
      history.push({
        pathname: `/`,
      });
    }
  };

  const removeAttributes = () => {
    document.getElementById("email").removeAttribute("readonly");
    document.getElementById("password").removeAttribute("readonly");
    removeCookie("email", "");
    removeCookie("password", "");
    removeCookie("id", 0);
    removeCookie("username", "");
  };

  return (
    <React.Fragment>
      <div className="form">
        <h2 className="loginHeader">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input-style"
            id={"email"}
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
            id={"password"}
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
          <button
            className="button"
            onClick={() => {
              removeAttributes();
            }}
          >
            Try again
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
