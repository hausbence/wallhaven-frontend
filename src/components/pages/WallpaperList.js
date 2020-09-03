import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http";
import { Link } from "react-router-dom";
import loadingGif from "../../loading2.gif";

const WallpaperList = (props) => {
  const [wallpaperUrl, setWallpaperUrl] = useState(props.url);
  const [limit] = useState(parseInt(props.limit));
  const [page, setPage] = useState(parseInt(props.page));
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, fetchedData] = useHttp(
    wallpaperUrl + "&page=" + page.toString(),
    [wallpaperUrl, limit, page]
  );

  console.log(isLoading);

  if (wallpaperUrl !== props.url) {
    setWallpaperUrl(props.url);
  }

  useEffect(() => {
    if (fetchedData) {
      setWallpapers(fetchedData.data.data);
    }
  }, [fetchedData]);

  let content = (
    <div className={"loading-container"}>
      <img src={loadingGif} alt={"loading"} />
    </div>
  );

  let pageButtons = (
    <div>
      <button
        onClick={() => {
          if (fetchedData.data.meta.current_page > 1) {
            setPage(page - 1);
          }
        }}
      >
        Previous
      </button>
      <button
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
        <div>
          {wallpapers.slice(0, limit).map((wallpaper) => (
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
          ))}
          {!props.mainpage ? pageButtons : null}
        </div>
      </React.Fragment>
    );
  } else if (fetchedData && !wallpapers) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default WallpaperList;
