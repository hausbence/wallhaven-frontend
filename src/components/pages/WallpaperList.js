import React, { useState } from "react";
import { useHttp } from "../../hooks/http";
import {Link} from "react-router-dom";
import loadingGif from '../../loading2.gif'


const WallpaperList = () => {
  const [wallpaperUrl, setWallpaperUrl] = useState(
    "https://wallhaven.cc/api/v1/search?sorting=views&purity=100"
  );
  const [isLoading, fetchedData] = useHttp(wallpaperUrl, [wallpaperUrl]);

  const wallpapers = fetchedData ? fetchedData.data.data : null;

  let content = <div className={"loading-container"}><img src={loadingGif} alt={"loading"}/></div>


  const getLink = (id) => {
    return "wallpaper/" + id;
  }

  if (!isLoading && wallpapers) {
    console.log(wallpapers);
    content = (
      <React.Fragment>
        <div>
          {wallpapers.map((wallpaper) => (
              <Link to={getLink(wallpaper.id)}>
            <img
              src={wallpaper.thumbs.small}
              alt="Wallpaper"
              key={wallpaper.thumbs.small}
            />
              </Link>
          ))}
        </div>
      </React.Fragment>
    );
  } else if (!isLoading && !wallpapers) {
    content = <p>Could not fetch any data.</p>;
  }

  return content;
};

export default WallpaperList;
