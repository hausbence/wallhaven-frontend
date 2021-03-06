import React, { useState, useEffect } from "react";
import { useHttp } from "../../../hooks/http";
import { Link } from "react-router-dom";
import loadingGif from "../../../resources/loading2.gif";
import "./WallpaperList.css";
import "./Dropdown.css";

const WallpaperList = (props) => {
  const [wallpaperUrl, setWallpaperUrl] = useState(props.url);
  const [value, setValue] = useState("something");
  const [limit] = useState(parseInt(props.limit));
  const [page, setPage] = useState(parseInt(props.page));
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, fetchedData] = useHttp(
    wallpaperUrl + "&page=" + page.toString(),
    [wallpaperUrl, limit, page]
  );

  useEffect(() => {
    if (fetchedData) {
      setWallpapers(fetchedData.data.data);
    }
  }, [fetchedData]);

  const handleSubmit = (event) => {
    let result = "&resolutions=" + value;
    setWallpaperUrl(props.url + result);
  };

  const handleChange = () => {
    let resolutionValue = document.getElementById("dropdown-menu").value;
    setValue(resolutionValue);
    console.log(resolutionValue);
    let result = "&resolutions=" + resolutionValue;
    setWallpaperUrl(props.url + result);
  };

  const logIsLoading = () => {
    if (isLoading) {
      console.log("Loading");
    }
  };

  let dropDown = (
    <div className="dropdown">
      <form onSubmit={handleSubmit}>
        <label>
          <select id="dropdown-menu" value={value} onChange={handleChange}>
            <option value="3840x2160">3840x2160</option>
            <option value="2560x1440">2560x1440</option>
            <option value="1920x1080">1920x1080</option>
            <option value="1280x720">1280x720</option>
            <option value="">Remove filters</option>
          </select>
        </label>
        <input className={"btn"} type="submit" value="Submit" />
      </form>
    </div>
  );

  let content = (
    <div className={"loading-container"}>
      <img src={loadingGif} alt={"loading"} />
    </div>
  );

  let pageButtons = (
    <div className={"button-container"}>
      <button
        className={"btn"}
        onClick={() => {
          if (fetchedData.data.meta.current_page > 1) {
            setPage(page - 1);
          }
        }}
      >
        Previous
      </button>
      <button
        className={"btn"}
        onClick={() => {
          if (
            fetchedData.data.meta.current_page < fetchedData.data.meta.last_page
          ) {
            setPage(page + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );

  if (wallpapers) {
    content = (
      <React.Fragment>
        {!props.mainpage ? dropDown : null}
        <div className={"wallpaper-container"}>
          {wallpapers.slice(0, limit).map((wallpaper) => (
            <div className={"wallpaper-block"} key={wallpaper.thumbs.small}>
              <Link
                to={"/wallpaper/" + wallpaper.id}
                key={wallpaper.thumbs.small}
              >
                <img
                  src={wallpaper.thumbs.small}
                  alt="Wallpaper"
                  key={wallpaper.thumbs.small}
                />
              </Link>
            </div>
          ))}
        </div>
        {!props.mainpage ? pageButtons : null}
      </React.Fragment>
    );
  } else if (fetchedData && !wallpapers) {
    logIsLoading();
    content = <p>Could not fetch any data.</p>;
  }

  return content;
};

export default WallpaperList;
