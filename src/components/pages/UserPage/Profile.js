import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import userlogo from "../../../resources/mini_default_user.png";
import "./Profile.css";
import {Link} from "react-router-dom";
import authHeader from "../../services/auth-header";

const Profile = () => {
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [uploaded, setUploaded] = useState([]);
    const [favouriteIDS, setFavouriteIDS] = useState([]);
    const [cookies] = useCookies(["id", "username", "email", "password", "user"]);

    async function getFriends() {
        await Axios.get(`http://localhost:8080/friends/${cookies.id}`, { headers: authHeader(cookies.user) })
            .then((response) => {
                setFriends(response.data);
                return Axios.get(
                    `http://localhost:8080/profile/favourites/${cookies.id}`, { headers: authHeader(cookies.user) }
                );
            })
            .then((response) => {
                setFavouriteIDS(response.data);
                return Axios.get(`http://localhost:8080/users/${cookies.id}`, { headers: authHeader(cookies.user) });
            })
            .then((response) => {
                setUsers(response.data);
                return Axios.get(`http://localhost:8080/uploaded/${cookies.id}`, { headers: authHeader(cookies.user) });
            })
            .then((response) => {
                setUploaded(response.data);
            })
            .catch((error) => console.log(error.response));
    }


    useEffect(() => {
        getFriends().then();
    }, [])

    const getSubstring = (wid) => {
        return wid.substring(0, 2);
    };

    let content = (
        <div>
            <h1>Loading...</h1>
        </div>
    );

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
                        <img className="imageStyle" src={userlogo} alt="userlogo"/>
                        <button
                            className="add-friend-button"
                            onClick={() => addFriend(user.id)}>
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
                            <img className="profile-wallpaper-block" src={`http://localhost:8080/image/${img.link}`}
                                 alt="userlogo"/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    const addFriend = (id) => {
        Axios.post(`http://localhost:8080/addFriend/${cookies.id}/${id}`, {}, { headers: authHeader(cookies.user) } ).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
        setTimeout(() => {
            getFriends().then();
        }, 300);
    };

    const removeFriend = (id) => {
        Axios.post(`http://localhost:8080/removeFriend/${cookies.id}/${id}`, {}, { headers: authHeader(cookies.user) } ).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
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

    return (
        content
    )

};

export default Profile;
