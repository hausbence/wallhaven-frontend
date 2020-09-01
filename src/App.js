import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import WallpaperList from "./components/pages/WallpaperList";

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
    wallpapers.data.data.forEach(item => {
      if (item.category === "anime"){
        const index = wallpapers.data.data.indexOf(item);
        if (index > -1) {
          wallpapers.data.data.splice(index, 1);
        }
      }
    })
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
