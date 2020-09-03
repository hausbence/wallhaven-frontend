import React, {useState, useEffect} from "react";
import {useHttp} from "../../../hooks/http";
import {Link, BrowserRouter as Router, Route} from "react-router-dom";
import loadingGif from "../../../loading2.gif";
import WallpaperList from "../WallpaperList";
import TagPage from "../TagPage/TagPage";
import './mainPage.css';
import '../../layout/Dropdown.css';



const MainPage = () => {

    const [value, setValue] = useState('something');
    const [url, setUrl] = useState('https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random&order=desc');

    const handleSubmit = (event) => {
        let result = "&resolutions=" + value;
        setUrl('https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random&order=desc' + result);
        console.log(url);
        event.preventDefault();
    }

    const handleChange = () => {
        let resolutionValue = document.getElementById("dropdown").value;
        setValue(resolutionValue);
    }

    let mainContent = (
        <div>
            <div>
                <div className="box">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <select id="dropdown" value={value} onChange={handleChange}>
                                <option value="1920x1080">1920x1080</option>
                                <option value="1680x1050">1680x1050</option>
                                <option value="1280x720">1280x720</option>
                            </select>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            <div className={"tag-container"}>
                <Link to={"/tag/537"}><p>#League of Legends</p></Link>
                <Link to={"/tag/65348"}><p>#4K</p></Link>
                <Link to={"/tag/1240"}><p>#Technology</p></Link>
                <Link to={"/tag/37"}><p>#Nature</p></Link>
                <Link to={"/tag/14"}><p>#Science fiction</p></Link>
                <Link to={"/tag/479"}><p>#Digital art</p></Link>
                <Link to={"/tag/711"}><p>#Landscape</p></Link>
                <Link to={"/tag/328"}><p>#Mountains</p></Link>
                <Link to={"/tag/2278"}><p>#Minimalism</p></Link>
            </div>
            <div>
                <WallpaperList
                    url={url}
                    limit="12"
                    mainpage="true"/>
            </div>
            <div className={"tag-container"}>
                <Link to={"/tag/338"}><p>#night</p></Link>
                <Link to={"/tag/55"}><p>#video-games</p></Link>
                <Link to={"/tag/7347"}><p>#programming</p></Link>
                <Link to={"/tag/1722"}><p>#plants</p></Link>
                <Link to={"/tag/14"}><p>#Science fiction</p></Link>
                <Link to={"/tag/17"}><p>#city</p></Link>
                <Link to={"/tag/40"}><p>#water</p></Link>
                <Link to={"/tag/314"}><p>#car</p></Link>
                <Link to={"/tag/403"}><p>#3D</p></Link>
            </div>
            <div>
                <WallpaperList
                    url={url}
                    limit="12"
                    mainpage="true"/>
            </div>
        </div>

    )


    return mainContent;
}

export default MainPage;