import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "../pages/WallpaperList/Login.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const API_URL = "http://localhost:8762/user-service/auth/";

  const [cookies, setCookie, removeCookie] = useCookies([
    "id",
    "email",
    "username",
    "user",
  ]);
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const submitLogin = (username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          setCookie("email", response.data.email, { path: "/" });
          setCookie("username", response.data.username, { path: "/" });
          setCookie("id", response.data.id, { path: "/" });
          setCookie("user", response.data, { path: "/" });
          // localStorage.setItem("user", JSON.stringify(response.data)); //localstorage
        }

        return response.data;
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      submitLogin(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h2 className="loginHeader">Login</h2>
      <Form onSubmit={handleLogin} ref={form}>
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          className="input-style"
          name="username"
          value={username}
          placeholder="Username"
          onChange={onChangeUsername}
          validations={[required]}
        />

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          className="input-style"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChangePassword}
          validations={[required]}
        />

        <div className="form-group">
          <button className="button" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"> </span>
            )}
            <span>Login</span>
          </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Login;
