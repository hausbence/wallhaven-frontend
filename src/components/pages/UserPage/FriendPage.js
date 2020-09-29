import React, {useEffect, useState} from "react";
import Axios from "axios";
import userlogo from '../../../resources/mini_default_user.png';
import './Profile.css';
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const FriendPage = () => {
    let friendId = useParams().id;

    const [favourites, setFavourites] = useState([]);
    const [friendData, setFriendData] = useState([]);
    const [uploadedIMGS, setUploadedIMGSs] = useState([]);
    const [cookies, setCookie] = useCookies(["id","username","email","password"])

    async function getFavourites () {
        await Axios.get(
            `http://localhost:8080/friend/favourites/${friendId}`
        )
            .then((response) => {
                setFavourites(response.data);
                return Axios.get(`http://localhost:8080/friend/${friendId}`)
            })
            .then((response) => {
                setFriendData(response.data);
            })
            .catch((error) => console.log(error.response));
    }

    useEffect(() => {
        getFavourites().then();
    }, [])


    console.log(favourites);
    console.log(friendData);

    const getSubstring = (wid) => {
        return wid.substring(0,2)
    }

    let favouritesContent = <p>{friendData.name} doesn't have any favourites</p>
    if (favourites.length > 0) {
        favouritesContent = <div className={"wallpaper-container"}>
            {favourites.map((fav, i) => (
                <div key={i}>
                    <Link to={"/wallpaper/" + fav.wallpaperId}><img className="wallpaper-block" src={`https://th.wallhaven.cc/small/${getSubstring(fav.wallpaperId)}/${fav.wallpaperId}.jpg`} alt=""/></Link>
                </div>
            ))}
        </div>
    }

    return  (
        <React.Fragment>
            <div className="friend-container">
                <div>
                    <h1>Page of {friendData.name}</h1>
                </div>
                <div>
                    <h3>{friendData.name}'s favourites: </h3>
                    <div>
                        {favouritesContent}
                    </div>
                </div>
            </div>
        </React.Fragment>

    )

}

export default FriendPage;