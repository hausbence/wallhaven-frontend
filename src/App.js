import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./components/layout/Topbar.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import WallpaperList from "./components/pages/WallpaperList/WallpaperList";
import Search from "./components/pages/Search";
import SingleWallpaper from "./components/pages/SingleWallpaper/SingleWallpaper";
import TagPage from "./components/pages/TagPage/TagPage";
import MainPage from "./components/pages/MainPage/MainPage";
import Login from "./components/security/Login";
import Profile from "./components/pages/UserPage/Profile";
import FriendPage from "./components/pages/UserPage/FriendPage";


import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/layout/Theme";
import { GlobalStyles } from "./components/layout/GlobalStyles";
import Users from "./components/pages/UserPage/Users";
import UploadImage from "./components/pages/upload_image/UploadImage";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import Register from "./components/security/Register";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <React.Fragment>
            <div className="App">
              <div className="topbar">
                <Header />
                <Navbar />
                <button onClick={toggleTheme}>Theme</button>
              </div>
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
              <Route exact path="/registration" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/favourites" component={Profile} />
              <Route exact path="/friend/:id" component={FriendPage} />
              <Route exact path="/upload" component={UploadImage} />
              <Route exact path="/settings" component={UpdateProfile} />
            </div>
          </React.Fragment>
        </ThemeProvider>
      </Switch>
    </Router>
  );
};

export default App;
