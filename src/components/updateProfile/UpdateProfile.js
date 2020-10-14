import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useCookies } from "react-cookie";
import edit from "../../resources/edit.png";
import "./UpdateProfile.css";
import { useHistory } from "react-router-dom";
import authHeader from "../services/auth-header";

const UpdateProfile = () => {
  const [userData, setUserData] = useState([]);
  const { handleSubmit, register } = useForm();
  const [cookies, setCookies] = useCookies(["id", "email", "password", "username"]);
  const [cookies1, removeCookie] = useCookies(["id", "email", "password", "username"]);
  const [emailVisible, setEmailVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameVisible, setUsernameVisible] = useState(false);
  const history = useHistory();

  if (cookies.id === 0) {
    history.push("/login");
  }

  const url = "http://localhost:8080";

  const nameCheck = (values) => {
    return new Promise((resolve) => {
      Axios.get(url + "/available/name/" + values.name, { headers: authHeader(cookies.user) }).then((r) => {
        resolve(r.data);
      });
    });
  };
  const emailCheck = (values) => {
    return new Promise((resolve) => {
      Axios.get(url + "/available/email/" + values.email, { headers: authHeader(cookies.user) }).then((r) => {
        resolve(r.data);
      });
    });
  };

  async function nameUpdate(values) {
    const result = await nameCheck(values);
    if (!result) {
      updateUsername(values);
      setTimeout(() => {
        handleLogout()
      }, 350)
    } else {
      alert("this name is already used");
    }
  }

  async function passwordUpdate(values) {
    updatePassword(values);
  }

  async function emailUpdate(values) {
    const result = await emailCheck(values);
    if (!result) {
      updateEmail(values);
      setTimeout(() => {
        handleLogout()
      }, 350)
    } else {
      alert("this email is already used");
    }
  }

  const onSubmitUsername = (values) => {
    nameUpdate(values).then();
  };

  const onSubmitPassword = (values) => {
    if (values?.pw1 === values?.pw2) {
      passwordUpdate(values).then();
      setTimeout(() => {
        handleLogout()
      }, 350)

    }
    else {
      alert("Passwords should match, bro")
    }
  };

  function updateUsername(values) {
    Axios.post(url + "/update/name/" + values.name + "/" + cookies.id,[],{ headers: authHeader(cookies.user) }).then(
      (r) => {
        console.log(r);
      }
    );
  }

  function updateEmail(values) {
    Axios.post(url + "/update/email/" + values.email + "/" + cookies.id, [],{ headers: authHeader(cookies.user) }).then(
      (r) => {
        console.log(r);
      }
    );
  }

  function updatePassword(values) {
    Axios.post(url + "/update/password/" + values.pw1 + "/" + cookies.id, [],{ headers: authHeader(cookies.user) }).then(
      (r) => {
        console.log(r);
      }
    );
  }

  const onSubmitEmail = (values) => {
    emailUpdate(values).then();
  };

  let newEmail = "";
  let newUsername = "";
  let newPassword = "";


  if (emailVisible) {
    newEmail = (
      <div className="update-form">
        <h1>Your new email: </h1>
        <form onSubmit={handleSubmit(onSubmitEmail)}>
          <input
            name={"email"}
            type={"email"}
            placeholder={userData?.email}
            ref={register({
              required: true,
            })}
          />
          <button type={"submit"}>Submit</button>
        </form>
      </div>
    );
  }

  if (usernameVisible) {
    newUsername = (
      <div className="update-form">
        <h1>Your new username: </h1>
        <form onSubmit={handleSubmit(onSubmitUsername)}>
          <input
            name={"name"}
            type={"text"}
            placeholder={userData?.name}
            ref={register({
              required: true,
            })}
          />
          <button type={"submit"}>Submit</button>
        </form>
      </div>
    );
  }

  if (passwordVisible) {
    newPassword = (
      <div className="update-form">
        <h1>Your new password: </h1>
        <form onSubmit={handleSubmit(onSubmitPassword)}>
          <input
            name={"pw1"}
            type={"password"}
            minLength={6}
            placeholder={userData?.name}
            ref={register({
              required: true,
            })}
          />
          <input
              name={"pw2"}
              type={"password"}
              minLength={6}
              placeholder={userData?.name}
              ref={register({
                required: true,
              })}
          />
          <button type={"submit"}>Submit</button>
        </form>
      </div>
    );
  }
  const handleLogout = () => {
    alert("Your setting are changed, please log in again!")
    removeCookie("email", "");
    removeCookie("password", "");
    removeCookie("id", 0);
    removeCookie("username", "");
    history.push("/login")
  };

  const editPasswordForm = () => {
    setEmailVisible(false);
    setUsernameVisible(false);
    setPasswordVisible(true)
  }

  const editEmailFrom = () => {
    setEmailVisible(true);
    setUsernameVisible(false);
    setPasswordVisible(false)
  };

  const editUsernameFrom = () => {
    setUsernameVisible(true);
    setEmailVisible(false);
    setPasswordVisible(false)
  };

  useEffect(() => {
    Axios.get(url + "/data/" + cookies.id, { headers: authHeader(cookies.user) }).then((r) => setUserData(r.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  let content = (
    <div>
      <h1>Loading...</h1>
    </div>
  );

  if (userData) {
    content = (
      <div className={"update-main-container"}>
        <div className={"update-email-container"}>
          <h1>Your current email:</h1>
          <p>
            {userData?.email}{" "}
            <img
              className={"update-edit-icon"}
              onClick={() => editEmailFrom()}
              src={edit}
              alt="edit-icon"
            />
          </p>
        </div>
        <div className={"update-username-container"}>
          <h1>Your current username: </h1>
          <p>
            {userData?.name}{" "}
            <img
              className={"update-edit-icon"}
              onClick={() => editUsernameFrom()}
              src={edit}
              alt="edit-icon"
            />
          </p>
          <p className="update-password" onClick={() => (
              editPasswordForm()
          )}>New Password</p>
        </div>
        {newEmail}
        {newUsername}
        {newPassword}
      </div>
    );
  }

  return content;
};

export default UpdateProfile;
