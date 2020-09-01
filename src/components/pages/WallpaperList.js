import React, { useState } from "react";
import { useHttp } from "../../hooks/http";

const WallpaperList = (props) => {
  const [wallpaperUrl, setWallpaperUrl] = useState(props.url);
  const [limit] = useState(props.limit);

  const [isLoading, fetchedData] = useHttp(wallpaperUrl, [wallpaperUrl, limit]);

  const wallpapers = fetchedData ? fetchedData.data.data : null;

  let content = <p>Loading...</p>;

  if (!isLoading && wallpapers) {
    console.log(wallpapers);
    content = (
      <React.Fragment>
        <div>
          {wallpapers.slice(0, parseInt(props.limit)).map((wallpaper) => (
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
