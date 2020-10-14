import React, {useState} from "react";
import {useHttp} from "../../../hooks/http";
import styled from "styled-components";
import "./SingleWallpaper.css";
import loadingGif from "../../../resources/loading2.gif";
import {Link} from "react-router-dom";
import Axios from "axios";
import {useCookies} from "react-cookie";
import authHeader from "../../services/auth-header";

const SingleWallpaper = (props) => {
    const [cookies] = useCookies(["id", "email", "password", "username"]);
    const [favorite, setFavorite] = useState(null);
    const [current] = useState(props);
    const [img, setImg] = useState(null);

    const wallpaperUrl = `https://wallhaven.cc/api/v1/w/${[
        current.match.params.id,
    ]}`;
    const [isLoading, fetchedData] = useHttp(wallpaperUrl, [wallpaperUrl]);

    const wallpaper = fetchedData ? fetchedData.data.data : null;

    let content = (
        <div className={"loading-container"}>
            <img src={loadingGif} alt={"loading"}/>
        </div>
    );

    function selectionSetter() {
        let value = document.getElementById("sources").value;
        if (wallpaper && !isLoading) {
            switch (value) {
                case "large":
                    setImg(wallpaper.path);
                    break;
                case "medium":
                    setImg(wallpaper.thumbs.large);
                    break;
                case "small":
                    setImg(wallpaper.thumbs.small);
                    break;
                default:
                    setImg(wallpaper.thumbs.small);
                    break;
            }
        }
    }

    const addFavorite = (wallpaperId) => {
        Axios.post(
            `http://localhost:8080/addfavorite/${cookies?.id}/${wallpaperId}`,
            {}, {headers: authHeader(cookies.user)}
        ).then((response) => {
            console.log(response);
        });
        setTimeout(() => {
            extracted();
        }, 500);
    };

    const SideBar = styled.div`
    border: 2px solid #333;
    height: auto;
    width: auto;
    min-width: 180px;
    z-index: 1;
    bottom: 0;
    left: 0;
    background-color: #333;
    overflow-x: hidden;
    padding-top: 20px;
    color: white;
  `;

    const DropDown = styled.div`
    text-align: center;
  `;

    const IconContainer = styled.div``;

    const ListItem = styled.li`
    width: 20%;
  `;

    const getBackgroundColor = (color) => {
        return {
            backgroundColor: color,
            color: color,
        };
    };
    const TagContainer = styled.div`
    display: flex-box;
  `;

    const Tag = styled.div`
    text-align: center;
    width: 50%;
    border: 1px solid white;
    margin-block-start: 8px;
    margin-inline-start: 30px;
    border-radius: 5px;
    color: white;
  `;

    const ColorList = styled.ul`
    border: 2px solid white;
    border-radius: 5px;
    text-align: center;
    display: flex;
    list-style-type: circle;
    margin-block-start: 3em;
    margin-block-end: 3em;
    margin-inline-start: 22px;
    margin-inline-end: 18px;
  `;

    function extracted() {
        Axios.get(
            `http://localhost:8080/favorite/${cookies?.id}/${wallpaper?.id}`, {headers: authHeader(cookies.user)}
        ).then((r) => {
            setFavorite(r.data);
        });
    }

    if (!isLoading && wallpaper) {
        const size = Math.round(wallpaper.file_size / 1000000);
        if (img === null) {
            setImg(wallpaper.path);
        }
        if (cookies.id !== "0") {
            console.log(cookies);
            extracted();
        }
        if (favorite !== null || cookies.id === "0") {
            console.log(favorite);
            let button = "";
            if (favorite === false) {
                button = (
                    <button
                        onClick={() => {
                            addFavorite(wallpaper?.id);
                        }}
                        className="btn"
                    >
                        Add to favorites
                    </button>
                );
            } else {
                if (cookies.id === "0") {
                    button = "Please log in to add wallpaper to favorites";
                } else {
                    button = <p>One of your favorites</p>;
                }
            }

            console.log(wallpaper);
            content = (
                <div className={"main-container"}>
                    <SideBar>
                        {button}
                        <IconContainer>
                            <p className={"res"}>{wallpaper.resolution}</p>
                            <a
                                className="link"
                                href="https://www.artstation.com/artwork/8lvmER"
                            >
                                www.artstation.com
                            </a>
                            <React.Fragment>
                                <ColorList className="sidebare-section color-palette">
                                    {wallpaper.colors.map((color) => (
                                        <ListItem style={getBackgroundColor(color)}> </ListItem>
                                    ))}
                                </ColorList>
                                <p className={"tag-title"}>Tags: </p>
                                <TagContainer>
                                    {wallpaper.tags.map((tag) => (
                                        <Link to={"/tag/" + tag.id}>
                                            <Tag>{tag.name}</Tag>
                                        </Link>
                                    ))}
                                </TagContainer>
                            </React.Fragment>
                            <p className="tag-title">Properties: </p>
                            <div className="properties">
                                <p>uploader: {wallpaper.uploader.username}</p>
                                <p>category: {wallpaper.category}</p>
                                <p>purity: {wallpaper.purity}</p>
                                <p>size: {size} mb</p>
                                <p>views: {wallpaper.views}</p>
                                <p>favorites: {wallpaper.favorites}</p>
                                <p>link: {wallpaper.short_url}</p>
                            </div>
                        </IconContainer>
                        <p className={"tag-title"}>Resolution quality:</p>
                        <DropDown>
                            <select
                                id="sources"
                                name="sources"
                                className="custom-select sources"
                            >
                                <option value="large" onChange={selectionSetter}>
                                    Large
                                </option>
                                <option value="medium" onChange={selectionSetter}>
                                    Medium
                                </option>
                                <option value="small" onChange={selectionSetter}>
                                    Small
                                </option>
                            </select>
                            <button className={"btn"} onClick={selectionSetter}>
                                Submit
                            </button>
                        </DropDown>
                    </SideBar>
                    <div className="img-container">
                        <img className={"img"} src={img} alt={""}/>
                    </div>
                </div>
            );
        }
    } else if (!isLoading && !wallpaper) {
        content = <p>Could not fetch any data.</p>;
    }

    return content;
};

export default SingleWallpaper;
