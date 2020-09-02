import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import WallpaperList from "./components/pages/WallpaperList";
import SingleWallpaper from "./components/pages/SingleWallpaper/SingleWallpaper";
import LatestWallpaperList from "./components/pages/LatestWallpaperList";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <Route path="/wallpapers" render={(props) => <WallpaperList />} />
          <Route path="/latest" render={(props) => <LatestWallpaperList />} />
          <Route exact path="/wallpaper/:id" component={SingleWallpaper} />
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
