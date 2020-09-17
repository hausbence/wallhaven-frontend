import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import userlogo from '../../../resources/mini_default_user.png';
import './Profile.css';

const Profile = () => {
    const [friends, setFriends] = useState([]);
    const [favouriteIDS, setFavouriteIDS] = useState([]);
    const [favouriteIMGS, setfavouriteIMGS] = useState([]);
    const [cookies, setCookie] = useCookies(["id","username","email","password"])


    function getFriends() {
        Axios.get(
            `http://localhost:8080/profile/${cookies.id}`
        ). then((r) => setFriends(r.data));
    }

    function getFavouriteIDS() {
        Axios.get(
            `http://localhost:8080/profile/favourites/${cookies.id}`
        ). then((r) => setFavouriteIDS(r.data));
    }

    function getFavouriteIMGS() {
        favouriteIDS.map((id) => {
            Axios.get(
                `https://wallhaven.cc/api/v1/w/${id}`
            ). then((r) => setfavouriteIMGS(r.data))
        })
    }

    useEffect(() => {
        getFriends();
        getFavouriteIDS();
        getFavouriteIMGS();
    }, [])

    console.log(cookies);
    console.log(friends, "FRIENDS");
    console.log(favouriteIDS, "FAVIDS");
    console.log(favouriteIMGS, "FAVIMGS");

    return (
        <div className="friend-container">
            <h1>Hey, {cookies.username}</h1>
            <h3>Here is a list of your friends: </h3>
            <React.Fragment>
                <div>
                    {friends.map((friend, i) => (
                        <div key={i} className="friend-card">
                            <p>{friend.name}</p>
                            <img className="imageStyle" src={userlogo} alt="userlogo"/>
                        </div>
                        ))}
                </div>
            </React.Fragment>
        </div>
    )
}


export default Profile;