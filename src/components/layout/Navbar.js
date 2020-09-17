import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import {useCookies} from "react-cookie";

const Navbar = () => {

  let history = useHistory();
  const [cookies, removeCookie] = useCookies(["email", "password", "id"]);

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
        removeCookie("id", 0)
    }

    let content = (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/random">Random</Link>
            <Link to="/toplist">Toplist</Link>
            <Link to="/latest">Latest</Link>
            <Link to="/registration">Registration</Link>
            <Link to="/login">Login</Link>
            <input
                type="text"
                className="input"
                id="input"
                placeholder="Search..."
                onKeyPress={handleKeyPress}
            />
        </div>
    )

    if (cookies.email) {
        content = (
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/random">Random</Link>
                <Link to="/toplist">Toplist</Link>
                <Link to="/latest">Latest</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/" onClick={handleLogout}>Logout</Link>
                <input
                    type="text"
                    className="input"
                    id="input"
                    placeholder="Search..."
                    onKeyPress={handleKeyPress}
                />
            </div>
        );

    }
    return content;

};

export default Navbar;
