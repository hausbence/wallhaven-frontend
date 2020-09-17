import React, { useState } from "react";
import { Link } from "react-router-dom";
import WallpaperList from "../WallpaperList/WallpaperList";
import "./MainPage.css";

const MainPage = () => {
  const [url] = useState(
    "https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random&order=desc"
  );

  return (
    <React.Fragment>
      <div className={"tag-container"}>
        <Link to={"/tag/537"}>
          <p>#league_of_legends</p>
        </Link>
        <Link to={"/tag/65348"}>
          <p>#4k</p>
        </Link>
        <Link to={"/tag/1240"}>
          <p>#technology</p>
        </Link>
        <Link to={"/tag/37"}>
          <p>#nature</p>
        </Link>
        <Link to={"/tag/14"}>
          <p>#science_fiction</p>
        </Link>
        <Link to={"/tag/479"}>
          <p>#digital_art</p>
        </Link>
        <Link to={"/tag/711"}>
          <p>#landscape</p>
        </Link>
        <Link to={"/tag/328"}>
          <p>#mountains</p>
        </Link>
        <Link to={"/tag/2278"}>
          <p>#minimalism</p>
        </Link>
      </div>
      <WallpaperList url={url} limit="12" mainpage="true" />
      <div className={"tag-container"}>
        <Link to={"/tag/338"}>
          <p>#night</p>
        </Link>
        <Link to={"/tag/55"}>
          <p>#video_games</p>
        </Link>
        <Link to={"/tag/7347"}>
          <p>#programming</p>
        </Link>
        <Link to={"/tag/1722"}>
          <p>#plants</p>
        </Link>
        <Link to={"/tag/14"}>
          <p>#science_fiction</p>
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
          <p>#3d</p>
        </Link>
      </div>
      <WallpaperList url={url} limit="12" mainpage="true" />
    </React.Fragment>
  );
};

export default MainPage;
