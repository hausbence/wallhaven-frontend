import React from "react";
import "./Header.css";
import {useCookies} from "react-cookie";

const Header = () => {
    const [cookies] = useCookies(["email", "password"]);

    return (
    <header className="header">
        <h1>Wallpaper Heaven</h1>
        <p className="email">Welcome, {cookies.email}</p>
    </header>
  );
};

export default Header;
