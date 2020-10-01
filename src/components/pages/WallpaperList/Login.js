import React from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useCookies } from "react-cookie";
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();
  const [, setCookie] = useCookies(["id", "email", "password", "username"]);
  let url = "http://localhost:8080";
  function checkLogin(values) {
    return new Promise((resolve) => {
      Axios.get(url + "/login/" + values.email + "/" + values.password).then(
        (r) => {
          resolve(r.data);
        }
      );
    });
  }

  async function loginCheck(values) {
    const result = await checkLogin(values);
    if (result) {
      const user = await getUserData(values);
      setCookie("id", user.id, { path: "/" });
      setCookie("email", user.email, { path: "/" });
      setCookie("password", user.password, { path: "/" });
      setCookie("username", user.name, { path: "/" });
      history.push({
        pathname: `/`,
      });
    } else {
      alert("invalid username or password!!");
    }
  }

  function getUserData(values) {
    return new Promise((resolve) => {
      Axios.get(url + "/login/" + values.email).then((r) => {
        resolve(r.data);
      });
    });
  }

  const onSubmit = (values) => {
    loginCheck(values).then();
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
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
