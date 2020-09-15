import React, { useState } from "react";
import { Link } from "react-router-dom";
import WallpaperList from "../WallpaperList/WallpaperList";
import "./mainPage.css";
import "../../layout/Dropdown.css";

const MainPage = () => {
  const [url] = useState(
    "https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random&order=desc"
  );

  return (
    <div>
      <div className={"tag-container"}>
        <Link to={"/tag/537"}>
          <p>#League of Legends</p>
        </Link>
        <Link to={"/tag/65348"}>
          <p>#4K</p>
        </Link>
        <Link to={"/tag/1240"}>
          <p>#Technology</p>
        </Link>
        <Link to={"/tag/37"}>
          <p>#Nature</p>
        </Link>
        <Link to={"/tag/14"}>
          <p>#Science fiction</p>
        </Link>
        <Link to={"/tag/479"}>
          <p>#Digital art</p>
        </Link>
        <Link to={"/tag/711"}>
          <p>#Landscape</p>
        </Link>
        <Link to={"/tag/328"}>
          <p>#Mountains</p>
        </Link>
        <Link to={"/tag/2278"}>
          <p>#Minimalism</p>
        </Link>
      </div>
      <div>
        <WallpaperList url={url} limit="12" mainpage="true" />
      </div>
      <div className={"tag-container"}>
        <Link to={"/tag/338"}>
          <p>#night</p>
        </Link>
        <Link to={"/tag/55"}>
          <p>#video-games</p>
        </Link>
        <Link to={"/tag/7347"}>
          <p>#programming</p>
        </Link>
        <Link to={"/tag/1722"}>
          <p>#plants</p>
        </Link>
        <Link to={"/tag/14"}>
          <p>#Science fiction</p>
        </Link>
        <Link to={"/tag/17"}>
          <p>#city</p>
        </Link>
        <Link to={"/tag/40"}>
          <p>#water</p>
        </Link>
        <Link to={"/tag/314"}>
          <p>#car</p>
        </Link>
        <Link to={"/tag/403"}>
          <p>#3D</p>
        </Link>
      </div>
      <div>
        <WallpaperList url={url} limit="12" mainpage="true" />
      </div>
    </div>
  );
};

export default MainPage;
