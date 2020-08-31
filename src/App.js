import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [wallpapers, setWallpapers] = useState(null);

  useEffect(() => {
    axios.get("https://wallhaven.cc/api/v1/search").then((res) => {
      setWallpapers(res);
    });
  }, []);

  let content = "Loading...";

  if (wallpapers) {
    console.log(wallpapers.data.data);
    content = (
      <div>
        {wallpapers.data.data.map((wallpaper) => (
          <img
            src={wallpaper.thumbs.small}
            alt="Wallpaper"
            key={wallpaper.thumbs.small}
          />
        ))}
      </div>
    );
  }

  return <div className="App">{content}</div>;
};

export default App;
