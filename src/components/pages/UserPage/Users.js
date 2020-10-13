import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./users.css";
import { useCookies } from "react-cookie";
import authHeader from "../../services/auth-header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(["id", "email", "password", "user"]);

  function extracted() {
    Axios.get(`http://localhost:8080/users/${cookies.id}`, { headers: authHeader(cookies.user) }).then((r) =>
      setUsers(r.data)
    );
  }

  useEffect(() => {
    extracted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cookies);
  const addFriend = (id) => {
    Axios.post(`http://localhost:8080/addFriend/${cookies.id}/${id}`, { headers: authHeader(cookies.user) }, {}).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(id);
    setTimeout(() => {
      extracted();
    }, 500);
  };
  console.log(users);
  return (
    <div className={"user__container"}>
      <h1>Users</h1>
      <React.Fragment>
        {users?.map((user) => (
          <div className={"user__card"}>
            <p>{user.name}</p>
            <button onClick={() => addFriend(user.id)}>add friend</button>
          </div>
        ))}
      </React.Fragment>
    </div>
  );
};

export default Users;
