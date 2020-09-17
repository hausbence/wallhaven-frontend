import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";

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
        <div>
            <h1>Hey, {cookies.username}</h1>
            <h3>Here is a list of your friends: </h3>
            <React.Fragment>
                {friends.map((friend, i) => (
                    <p key={i}>{friend.name}</p>
                ))}
            </React.Fragment>
        </div>
    )
}

export default Profile;