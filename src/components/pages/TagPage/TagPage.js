import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../../hooks/http";
import WallpaperList from "../WallpaperList/WallpaperList";

const TagPage = (props) => {
  let { id } = useParams();
  // const [pageByTag, setPageByTag] = useState(
  //     `https://wallhaven.cc/api/v1/search?categories=100&purity=100&q=+id:${id}`)
  const [wallpaperUrl] = useState(
    `https://wallhaven.cc/api/v1/search?categories=100&purity=100&q=+id:${id}`
  );
  const [isLoading, fetchedTagData] = useHttp(
    `https://wallhaven.cc/api/v1/tag/${id}`,
    []
  );
  const [tagData, setTagData] = useState([]);

  if (isLoading) {
    console.log("Loading");
  }

  useEffect(() => {
    if (fetchedTagData) {
      setTagData(fetchedTagData.data.data);
    }
  }, [fetchedTagData]);

  let content;

  if (tagData) {
    content = (
      <div>
        <div className={"tag-header"}>
          <h1>#{tagData.name}</h1>
        </div>
        <div>
          <WallpaperList url={wallpaperUrl} limit="24" page="1" />
        </div>
      </div>
    );
  } else {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default TagPage;
