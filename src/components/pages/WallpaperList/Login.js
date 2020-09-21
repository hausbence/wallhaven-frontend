import React, {useEffect, useState} from "react";
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
  const [users, setUsers] = useState([])
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
  let url = "http://localhost:8080/alluser";

  useEffect(() => {

    Axios.get(url).then(r => {
      setUsers(r.data)
    })
  },[login])
  const onSubmit = (values) => {
    document.getElementById("email").setAttribute("readonly", true);
    document.getElementById("password").setAttribute("readonly", true);
    console.log(users)

    users.forEach(user => {
      if (user.password === values.password && user.email === values.email) {
        setCookie("id", user.id, { path: "/" });
        setCookie("email", values.email, { path: "/" });
        setCookie("password", values.password, { path: "/" });
        setCookie("username", user.name, { path: "/" });
        history.push({
          pathname: `/`,
        });
      }
    })
  };

  let content = "Loading...";

  if (users.length !== 0) {
    content =  <React.Fragment>
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
  }

  const removeAttributes = () => {
    document.getElementById("email").removeAttribute("readonly");
    document.getElementById("password").removeAttribute("readonly");
    removeCookie("email", "");
    removeCookie("password", "");
    removeCookie("id", 0);
    removeCookie("username", "");
  };

  return content
};

export default Login;
