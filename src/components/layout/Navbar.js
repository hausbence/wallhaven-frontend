import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  let history = useHistory();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push({
        pathname: `/search/${document.getElementById("input").value}`,
      });
    }
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/random">Random</Link>
      <Link to="/toplist">Toplist</Link>
      <Link to="/latest">Latest</Link>
      <input
        type="text"
        className="input"
        id="input"
        placeholder="Search..."
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Navbar;
