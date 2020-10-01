import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const FriendPage = () => {
  let friendId = useParams().id;

  const [favourites, setFavourites] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [uploadedIMGS, setUploadedIMGSs] = useState([]);

  async function getFavourites() {
    await Axios.get(`http://localhost:8080/friend/favourites/${friendId}`)
      .then((response) => {
        setFavourites(response.data);
        return Axios.get(`http://localhost:8080/friend/${friendId}`);
      })
      .then((response) => {
        setFriendData(response.data);
        return Axios.get(`http://localhost:8080/uploaded/${friendId}`);
      })
      .then((response) => {
        setUploadedIMGSs(response.data);
      })
      .catch((error) => console.log(error.response));
  }

  useEffect(() => {
    getFavourites().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSubstring = (wid) => {
    return wid.substring(0, 2);
  };

  let favouritesContent = <p>{friendData.name} doesn't have any favourites</p>;
  if (favourites.length > 0) {
    favouritesContent = (
      <div className={"profile-wallpaper-container"}>
        {favourites.map((fav, i) => (
          <div key={i}>
            <Link to={"/wallpaper/" + fav.wallpaperId}>
              <img
                className="profile-wallpaper-block"
                src={`https://th.wallhaven.cc/small/${getSubstring(
                  fav.wallpaperId
                )}/${fav.wallpaperId}.jpg`}
                alt=""
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  let uploadedContent = (
    <p>{friendData.name} doesn't have any uploaded pictures</p>
  );
  if (uploadedIMGS.length > 0) {
    uploadedContent = (
      <div className="profile-wallpaper-container">
        {uploadedIMGS.map((fav, i) => (
          <div key={i}>
            <img className="profile-wallpaper-block" src={fav.link} alt="" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>{friendData.name}'s</h1>
      <h1>Favourites: </h1>
      {favouritesContent}
      <h1>Uploads: </h1>
      {uploadedContent}
    </div>
  );
};

export default FriendPage;
