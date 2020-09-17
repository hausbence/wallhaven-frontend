import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import userlogo from '../../../resources/mini_default_user.png';
import './Profile.css';
import {Link} from "react-router-dom";

const Profile = () => {
    const [friends, setFriends] = useState([]);
    const [users, setUsers ] = useState([])
    const [uploaded, setUploaded ] = useState([])
    const [favouriteIDS, setFavouriteIDS] = useState([]);
    const [favouriteIMGS, setfavouriteIMGS] = useState([]);
    const [cookies, setCookie] = useCookies(["id","username","email","password"])


   async function getFriends() {
        await Axios.get(
            `http://localhost:8080/profile/${cookies.id}`
        )
            .then((response) => {
                setFriends(response.data);
                return  Axios.get(`http://localhost:8080/profile/favourites/${cookies.id}`);
            })
            .then((response) => {
                setFavouriteIDS(response.data);
                return Axios.get(`http://localhost:8080/users/${cookies.id}`)
            }).then(response => {
                setUsers(response.data)
                return Axios.get(`http://localhost:8080/uploaded/${cookies.id}`)
            }).then(response => {
                setUploaded(response.data)
            })
            .catch((error) => console.log(error.response));
            }



    useEffect(() => {
        getFriends().then();
       // getFavouriteIDS();
       // getFavouriteIMGS();
    }, [])


    console.log(cookies);
    console.log(friends, "FRIENDS");
    console.log(favouriteIDS, "FAVIDS");
    console.log(favouriteIMGS, "FAVIMGS");
    console.log(users, "Users")

    let friendSuggestions = <h5>Cant find any </h5>;
    if (users.length > 0) {
        friendSuggestions = <div className={"suggestion__container"}>{users.map((user, i ) => (
            <div key={i} className="friend-card">
                <p>{user.name}</p>
                <img className="imageStyle" src={userlogo} alt="userlogo"/>
                <button onClick={() => (
                    addFriend(user.id)
                )}>add friend</button>
            </div>
        ))}</div>
    }

    const getSubstring = (wid) => {
        return wid.substring(0,2)
    }


    let favs = <p>You dont have any favorites</p>

    if (favouriteIDS.length > 0) {
        favs = <div className={"suggestion__container"}>
            {favouriteIDS.map((id, j ) => (
                <div key={j} className="friend-card">
                    <Link to={"/wallpaper/" + id}><img src={`https://th.wallhaven.cc/small/${getSubstring(id)}/${id}.jpg`} alt=""/></Link>
                </div>
            ))}
        </div>
    }

    let content = <div><h1>LOADING...</h1></div>

    const addFriend = (id) => {
        Axios.post(`http://localhost:8080/addFriend/${cookies.id}/${id}`, {}).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
    );
        setTimeout(() => {
            getFriends().then()

        }, 300)
        }
//asd

    if (friends && favouriteIDS ) {
        console.log(uploaded)
        content = <div className="friend-container">
            <h1>Hey, {cookies.username}</h1>
            <h3>Here is a list of your friends: </h3>
            <React.Fragment>
                <div className={"friends__container"}>
                    {friends.map((friend, i) => (
                        <div key={i} className="friend-card">
                            <p>{friend.name}</p>
                            <img className="imageStyle" src={userlogo} alt="userlogo"/>
                        </div>
                    ))}
                </div>
                <h1>Favorites: </h1>
                {favs}
                <div>
                    {uploaded.map((img, i) => (
                        <div key={i} className="friend-card">
                            <img className="imageStyle" src={img} alt="userlogo"/>
                        </div>
                    ) )}
                </div>
                <div><h1>Friend suggestions:</h1>
                    {friendSuggestions}
                </div>
            </React.Fragment>
        </div>
    }

    return (
        content
    )
}


export default Profile;