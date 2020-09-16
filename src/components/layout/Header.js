import React from "react";
import "./Header.css";
import {useCookies} from "react-cookie";

const Header = () => {
    const [cookies] = useCookies(["id","email", "password"]);
    console.log(cookies);

    let content = (
        <header className="header">
            <h1>Wallpaper Heaven</h1>
        </header>
    )

    if (cookies.email) {
        content = (
            <header className="header">
                <h1>Wallpaper Heaven</h1>
                <p className="email">Welcome, {cookies.email}</p>
            </header>
        )
    }

    return (
        content
  );
};

export default Header;
