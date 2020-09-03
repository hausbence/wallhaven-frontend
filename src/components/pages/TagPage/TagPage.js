import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {useHttp} from "../../../hooks/http";
import loadingGif from "../../../loading2.gif";



const TagPage = (props) => {
    let {id} = useParams();
    const [pageByTag, setPageByTag] = useState(
        `https://wallhaven.cc/api/v1/search?categories=100&purity=100&q=+id:${id}`)
    const [wallpaperUrl] = useState(`https://wallhaven.cc/api/v1/search?categories=100&purity=100&q=+id:${id}`);
    const [limit] = useState(24);
    const [isloading2, fetchedTagData] = useHttp(`https://wallhaven.cc/api/v1/tag/${id}`,[]

    )
    const [tagData, setTagData] = useState([])
    const [page, setPage] = useState(1);
    const [wallpapers, setWallpapers] = useState([]);
    const [isLoading, fetchedData] = useHttp(
        wallpaperUrl + "&page=" + page.toString(),
        [(wallpaperUrl, limit, page)]
    );

    useEffect(() => {
        if (fetchedData) {
            setWallpapers(fetchedData.data.data);
        }
    }, [fetchedData]);

    useEffect(() => {
        if (fetchedTagData) {
            //console.log(fetchedTagData.data.data)
            setTagData(fetchedTagData.data.data)
        }
    }, [fetchedTagData])

    let content = (
        <div className={"loading-container"}>
            <img src={loadingGif} alt={"loading"} />
        </div>
    );

    let pageButtons = (
        <div className={"button-container"}>
            <button className={"btn"}
                    onClick={() => {
                        if (fetchedData.data.meta.current_page > 1) {
                            setPage(page - 1);
                        }
                    }}
            >
                Previous
            </button>
            <button className={"btn"}
                    onClick={() => {
                        if (
                            fetchedData.data.meta.current_page < fetchedData.data.meta.last_page
                        ) {
                            setPage(page + 1);
                        }
                    }}
            >
                Next
            </button>
        </div>
    );

    if (wallpapers && tagData) {
        content = (
            <React.Fragment>
                <div className={"tag-header"}><h1>{tagData.name}</h1></div>
                <div className={"wallpaper-container"}>
                    {wallpapers.slice(0, limit).map((wallpaper) => (
                        <Link
                            to={"/wallpaper/" + wallpaper.id}
                            key={wallpaper.thumbs.small}
                        >
                            <img
                                src={wallpaper.thumbs.small}
                                alt="Wallpaper"
                                key={wallpaper.thumbs.small}
                            />
                        </Link>
                    ))}
                    {!props.mainpage ? pageButtons : null}
                </div>
            </React.Fragment>
        );
    } else if (fetchedData && !wallpapers) {
        content = <p>Could not fetch any data.</p>;
    }
    return content;
}




export default TagPage;