import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WallpaperList from "./WallpaperList/WallpaperList";

const Search = () => {
  let { searchTerm } = useParams();

  const [searchUrl, setSearchUrl] = useState(
    `https://wallhaven.cc/api/v1/search?q=${searchTerm}&categories=100&purity=100&sorting=relevance&order=desc&page=1`
  );

  useEffect(() => {
    if (searchTerm) {
      setSearchUrl(
        `https://wallhaven.cc/api/v1/search?q=${searchTerm}&categories=100&purity=100&sorting=relevance&order=desc&page=1`
      );
    }
  }, [searchTerm]);

  return <WallpaperList url={searchUrl} limit="24" page="1" />;
};

export default Search;
