import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/wallpapers">Wallpapers</Link>
      <Link to="/latest">Latest</Link>
    </div>
  );
};

export default Navbar;
