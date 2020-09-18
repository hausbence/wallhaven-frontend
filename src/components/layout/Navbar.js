import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import { useCookies } from "react-cookie";

const Navbar = () => {
  let history = useHistory();
  const [cookies, removeCookie] = useCookies([
    "email",
    "password",
    "id",
    "username",
  ]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push({
        pathname: `/search/${document.getElementById("input").value}`,
      });
    }
  };

  const handleLogout = () => {
    removeCookie("email", "");
    removeCookie("password", "");
    removeCookie("id", 0);
    removeCookie("username", "");
  };

  let content = (
    <React.Fragment>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
        <Link to="/toplist">Toplist</Link>
        <Link to="/latest">Latest</Link>
        {!cookies.email ? <Link to="/registration">Registration</Link> : null}
        {!cookies.email ? <Link to="/login">Login</Link> : null}
        {cookies.email ? <Link to="/profile">Profile</Link> : null}
        {cookies.email ? <Link to="/upload">Upload</Link> : null}
        {cookies.email ? (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        ) : null}
        <input
          type="text"
          className="input"
          id="input"
          placeholder="Search..."
          onKeyPress={handleKeyPress}
        />
      </div>

      {cookies.email ? (
        <p className="welcome">Welcome, {cookies.username}!</p>
      ) : null}
    </React.Fragment>
  );
  return content;
};

export default Navbar;
