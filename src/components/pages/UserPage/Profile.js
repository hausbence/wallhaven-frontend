import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import userlogo from '../../../resources/mini_default_user.png';
import './Profile.css';
import {Link} from "react-router-dom";

const Profile = () => {
    const [friends, setFriends] = useState([]);
    const [users, setUsers ] = useState([]);
    const [uploaded, setUploaded ] = useState([]);
    const [favouriteIDS, setFavouriteIDS] = useState([]);
    const [favouriteIMGS, setfavouriteIMGS] = useState([]);
    const [cookies, setCookie] = useCookies(["id","username","email","password"])


   async function getFriends() {
        await Axios.get(
            `http://localhost:8080/friends/${cookies.id}`
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


    console.log(uploaded, "uploaded")

    let friendSuggestions = <h5>Cant find any </h5>;
    if (users.length > 0) {
        friendSuggestions = <div className="friend-container card__container">{users.map((user, i ) => (
            <div key={i} className="friend-card">
                <p>{user.name}</p>
                <img className="imageStyle" src={userlogo} alt="userlogo"/>
                <button className="add-friend-button" onClick={() => (
                    addFriend(user.id)
                )}>Follow</button>
            </div>
        ))}</div>
    }

    const getSubstring = (wid) => {
        return wid.substring(0,2)
    }


    let favs = <p>You dont have any favorites</p>
    console.log(favouriteIDS)
    if (favouriteIDS.length > 0) {
        favs = <div className={"wallpaper-container"}>
            {favouriteIDS.map((fav, j ) => (
                <div key={j}>
                    <Link to={"/wallpaper/" + fav.wallpaperId}><img className="wallpaper-block" src={`https://th.wallhaven.cc/small/${getSubstring(fav.wallpaperId)}/${fav.wallpaperId}.jpg`} alt=""/></Link>
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

    const uploadPic = {
        maxHeight: '200px',
        maxWidth: '350px',
        height: 'auto',
        width: 'auto',
    }

    if (friends && favouriteIDS ) {
        console.log(uploaded)
        console.log(friends[0]?.friends,  "ADA")
        content = <div className="friend-container">
            <h1>Hey, {cookies.username}</h1>
            <h3>Here is a list of who you follow: </h3>
            <React.Fragment>
                <div className="friend-container card__container">

                    {friends.map((friend, i) => (
                            <div key={i} className="friend-card">
                                <p>{friend.name}</p>
                                <Link to={`/friend/${friend.id}`}>
                                    <img className="userlogo-style" src={userlogo} alt="userlogo"/>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <h1>Favorites: </h1>
                {favs}
                <h1>Your uploads: </h1>
                <div>
                    <div className="wallpaper-container">
                        {uploaded.map((img, i) => (
                            <div key={i}>
                                <img className="wallpaper-block" style={uploadPic} src={img.link} alt="userlogo"/>
                            </div>
                        ))}
                    </div>
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