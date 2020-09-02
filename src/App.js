import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import WallpaperList from "./components/pages/WallpaperList";

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
              />
            )}
          />
          <Route
            path="/random"
            render={(props) => (
              <WallpaperList
                url="https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random&order=desc"
                limit="24"
              />
            )}
          />
          <Route
            path="/toplist"
            render={(props) => (
              <WallpaperList
                url="https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=toplist&order=desc&topRange=1y"
                limit="24"
              />
            )}
          />
          <Route
            path="/latest"
            render={(props) => (
              <WallpaperList
                url="https://wallhaven.cc/api/v1/search?categories=100&purity=100"
                limit="24"
              />
            )}
          />
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
