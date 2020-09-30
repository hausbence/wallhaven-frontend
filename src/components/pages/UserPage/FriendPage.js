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
                return Axios.get(`http://localhost:8080/uploaded/${friendId}`)
            })
            .then((response) => {
                setUploadedIMGSs(response.data);
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

    const uploadPicStyle = {
        maxHeight: '200px',
        maxWidth: '350px',
        height: 'auto',
        width: 'auto',
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

    let uploadedContent = <p>{friendData.name} doesn't have any uploaded pictures</p>
    if (uploadedIMGS.length > 0) {
        uploadedContent = <div className="wallpaper-container">
            {uploadedIMGS.map((fav, i) => (
                <div key={i}>
                    <img className="wallpaper-block" style={uploadPicStyle} src={fav.link} alt=""/>
                </div>
            ))}
        </div>
    }

    return  (
        <React.Fragment>
            <div className="friend-container">
                <div>
                    <h1>{friendData.name}'s</h1>
                </div>
                <div>
                    <h3>Favourites: </h3>
                    <div>
                        {favouritesContent}
                    </div>
                </div>
                <div>
                    <h3>Uploads: </h3>
                    <div>
                        {uploadedContent}
                    </div>
                </div>
            </div>
        </React.Fragment>

    )

}

export default FriendPage;