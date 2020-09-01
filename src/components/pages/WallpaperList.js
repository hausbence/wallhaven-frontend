import React, { useState } from "react";
import { useHttp } from "../../hooks/http";

const WallpaperList = () => {
  const [wallpaperUrl, setWallpaperUrl] = useState(
    "https://wallhaven.cc/api/v1/search?categories=100&purity=100"
  );

  const [isLoading, fetchedData] = useHttp(wallpaperUrl, [wallpaperUrl]);

  const wallpapers = fetchedData ? fetchedData.data.data : null;

  let content = <p>Loading...</p>;

  if (!isLoading && wallpapers) {
    console.log(wallpapers);
    content = (
      <React.Fragment>
        <div>
          {wallpapers.map((wallpaper) => (
            <img
              src={wallpaper.thumbs.small}
              alt="Wallpaper"
              key={wallpaper.thumbs.small}
            />
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
