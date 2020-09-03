import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import WallpaperList from "./components/pages/WallpaperList";
import Search from "./components/pages/Search";
import SingleWallpaper from "./components/pages/SingleWallpaper/SingleWallpaper";
// import LatestWallpaperList from "./components/pages/LatestWallpaperList";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <Route
            exact
            path="/"
            render={(props) => (
              <WallpaperList
                url="https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random&order=desc"
                limit="18"
                mainpage="true"
              />
            )}
          />
          <Route
            path="/random"
            render={(props) => (
              <WallpaperList
                url="https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random&order=desc"
                limit="24"
                page="1"
              />
            )}
          />
          <Route
            path="/toplist"
            render={(props) => (
              <WallpaperList
                url="https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=toplist&order=desc&topRange=1y"
                limit="24"
                page="1"
              />
            )}
          />
          <Route
            path="/latest"
            render={(props) => (
              <WallpaperList
                url="https://wallhaven.cc/api/v1/search?categories=100&purity=100"
                limit="24"
                page="1"
              />
            )}
          />
          <Route exact path="/search/:searchTerm" component={Search} />
          <Route exact path="/wallpaper/:id" component={SingleWallpaper} />
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
