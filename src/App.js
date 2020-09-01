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
          <Route path="/wallpapers" render={(props) => <WallpaperList />} />
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
