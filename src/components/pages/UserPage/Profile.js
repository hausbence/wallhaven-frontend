import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import userlogo from '../../../resources/mini_default_user.png';
import './Profile.css';

const Profile = () => {
    const [friends, setFriends] = useState([]);
    const [cookies, setCookie] = useCookies(["id","username","email","password"])

    function getFriends() {
        Axios.get(
            `http://localhost:8080/profile/${cookies.id}`
        ). then((r) => setFriends(r.data));
    }

    useEffect(() => {
        getFriends();
    }, [])

    console.log(cookies);
    console.log(friends);

    return (
        <div className="friend-container">
            <h1>Hey, {cookies.username}</h1>
            <h3>Here is a list of your friends: </h3>
            <React.Fragment>
                <div>
                    {friends.map((friend, i) => (
                        <div className="friend-card">
                            <p key={i}>{friend.name}</p>
                            <img key={i} className="imageStyle" src={userlogo} alt="userlogo"/>
                        </div>
                        ))}
                </div>
            </React.Fragment>
        </div>
    )
}

export default Profile;