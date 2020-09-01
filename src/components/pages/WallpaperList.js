import React, { useState } from "react";
import { useHttp } from "../../hooks/http";

const WallpaperList = () => {
  const [wallpaperUrl, setWallpaperUrl] = useState(
    "https://wallhaven.cc/api/v1/search"
  );

  const [isLoading, fetchedData] = useHttp(wallpaperUrl, [wallpaperUrl]);

  const wallpapers = fetchedData ? fetchedData.data.data : null;

  let content = <p>Loading...</p>;

  if (!isLoading && wallpapers) {
    content = (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
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
