import React, { useState } from "react";
import { useHttp } from "../../../hooks/http";
import styled from "styled-components";
import "./SingleWallpaper.css";
import loadingGif from "../../../loading2.gif";

const SingleWallpaper = (props) => {
  const [current] = useState(props);
  const [img, setImg] = useState(null);

  const wallpaperUrl = `https://wallhaven.cc/api/v1/w/${[
    current.match.params.id,
  ]}`;
  const [isLoading, fetchedData] = useHttp(wallpaperUrl, [wallpaperUrl]);

  const wallpaper = fetchedData ? fetchedData.data.data : null;

  let content = (
    <div className={"loading-container"}>
      <img src={loadingGif} alt={"loading"} />
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

  const SideBar = styled.div`
    border: 2px solid black;
    border-radius 5px;
    height: 93.5%;
    width: 14%;
    position: fixed;
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

  if (!isLoading && wallpaper) {
    const size = Math.round(wallpaper.file_size / 1000000);
    if (img === null) {
      setImg(wallpaper.path);
    }

    console.log(wallpaper);
    content = (
      <div>
        <SideBar>
          <IconContainer>
            <p className={"res"}>{wallpaper.resolution}</p>
            {/* <a className="link" href="#">
              Search for similar...
            </a> */}
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
                  <Tag>{tag.name}</Tag>
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
              submit
            </button>
          </DropDown>
        </SideBar>
        <div>
          <img className={"img"} src={img} alt={"wallpaper"} />
        </div>
      </div>
    );
  } else if (!isLoading && !wallpaper) {
    content = <p>Could not fetch any data.</p>;
  }

  return content;
};

export default SingleWallpaper;
