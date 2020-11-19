import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import userlogo from "../../../resources/mini_default_user.png";
import settingsIcon from "../../../resources/settings_icon.png";
import "./Profile.css";
import {Link} from "react-router-dom";
import authHeader from "../../services/auth-header";
import url from "../../../util/url";


const Profile = () => {
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [favouriteIDS, setFavouriteIDS] = useState([]);
  const [cookies] = useCookies(["id", "username", "email", "password", "user"]);


  async function getFriends() {
    await Axios.get(url.user_service + `/friends/${cookies.id}`, {
      headers: authHeader(cookies.user),
    })
      .then((response) => {
        setFriends(response.data);
        return Axios.get(
          url.user_service + `/favorite/profile/${cookies.id}`,
          { headers: authHeader(cookies.user) }
        );
      })
      .then((response) => {
        setFavouriteIDS(response.data);
        return Axios.get( url.user_service + `/users/${cookies.id}`, {
          headers: authHeader(cookies.user),
        });
      })
      .then((response) => {
        setUsers(response.data);
        return Axios.get(url.user_service + `/uploaded/${cookies.id}`, {
          headers: authHeader(cookies.user),
        });
      })
      .then((response) => {
        setUploaded(response.data);
      })
      .catch((error) => console.log(error.response));
  }

  useEffect(() => {
    getFriends().then();
  }, []);

  const getSubstring = (wid) => {
    return wid.substring(0, 2);
  };

  let content = (
    <div>
      <h1>Loading...</h1>
    </div>
  );

    console.log(favouriteIDS);


    let friendsContent = <p>You are not following anyone.</p>;
    if (friends.length > 0) {
        friendsContent = (
            <div className="friend-container">
                {friends.map((friend, i) => (
                    <div key={i} className="friend-card">
                        <p>{friend.name}</p>
                        <Link to={`/friend/${friend.id}`}>
                            <img className="userlogo-style" src={userlogo} alt="userlogo"/>
                        </Link>
                        <button
                            className="add-friend-button"
                            onClick={() => removeFriend(friend.id)}>
                            Unfollow
                        </button>
                    </div>
                ))}
            </div>
        );
    }

  let favs = <p>You don't have any favorites.</p>;
  if (favouriteIDS.length > 0) {
    favs = (
      <div className={"profile-wallpaper-container"}>
        {favouriteIDS.map((fav, j) => (
          <div key={j}>
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

  let friendSuggestions = <p>Can't find any. </p>;
  if (users.length > 0) {
    friendSuggestions = (
      <div className="friend-container">
        {users.map((user, i) => (
          <div key={i} className="friend-card">
            <p>{user.name}</p>
            <img className="imageStyle" src={userlogo} alt="userlogo" />
            <button
              className="add-friend-button"
              onClick={() => addFriend(user.id)}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    );
  }

    let uploadContent = <p>You don't have any uploads.</p>;
    if (uploaded.length > 0) {
        uploadContent = (
            <div>
                <div className="profile-wallpaper-container">
                    {uploaded.map((img, i) => (
                        <div key={i}>
                            <img className="profile-wallpaper-block" src={url.user_service  + `/uploaded/image/${img.link}`}
                                 alt="userlogo"/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    const addFriend = (id) => {
        Axios.post(url.user_service + `/addFriend/${cookies.id}/${id}`, {}, { headers: authHeader(cookies.user) } ).then();
        setTimeout(() => {
            getFriends().then();
        }, 300);
    };

    const removeFriend = (id) => {
        Axios.post(url.user_service + `/removeFriend/${cookies.id}/${id}`, {}, { headers: authHeader(cookies.user) } ).then();
        setTimeout(() => {
            getFriends().then();
        }, 300);
    };


    if (friends && favouriteIDS) {
        content = (
            <div className="profile-container">
                <div className={"settings-button"}>
                    <Link to="/settings">User settings</Link>
                </div>
                <h1>Hey, {cookies.username}</h1>
                <h3>Here is a list of who you follow: </h3>
                {friendsContent}
                <h1>Favorites: </h1>
                {favs}
                <h1>Your uploads: </h1>
                {uploadContent}
                <h1>Friend suggestions:</h1>
                {friendSuggestions}
            </div>
        );
    }
  if (friends && favouriteIDS) {
    content = (
      <div className="profile-container">
        <div className="profile-user-details">
          <img className="userlogo" src={userlogo} alt="userlogo" />
          <div className="username-settings-row">
            <span className="filler"></span>
            <div className="username">
              <h1>{cookies.username}</h1>
            </div>
            <div className={"settings-button"}>
              <Link to="/settings">
                {" "}
                <img
                  className="settings-icon"
                  src={settingsIcon}
                  alt="settings"
                />
              </Link>
            </div>
          </div>
        </div>
        <h3>Here is a list of who you follow: </h3>
        {friendsContent}
        <h1>Favorites: </h1>
        {favs}
        <h1>Your uploads: </h1>
        {uploadContent}
        <h1>Friend suggestions:</h1>
        {friendSuggestions}
      </div>
    );
  }

  return content;
};

export default Profile;
