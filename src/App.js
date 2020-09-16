import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import WallpaperList from "./components/pages/WallpaperList/WallpaperList";
import Search from "./components/pages/Search";
import SingleWallpaper from "./components/pages/SingleWallpaper/SingleWallpaper";
import TagPage from "./components/pages/TagPage/TagPage";
import MainPage from "./components/pages/MainPage/MainPage";
import Registration from "./components/pages/Registration";
import Login from "./components/pages/WallpaperList/Login";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <React.Fragment>
            <div className="App">
              <Header />
              <Navbar />
              <Route exact path="/" component={MainPage} />
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
              <Route exact path="/tag/:id" component={TagPage} />
              <Route exact path="/registration" component={Registration} />
              <CookiesProvider>
                  <Route exact path="/login" component={Login} />
              </CookiesProvider>
            </div>
          </React.Fragment>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
