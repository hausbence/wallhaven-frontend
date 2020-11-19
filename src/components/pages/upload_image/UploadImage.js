import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import "./UploadImage.css";
import Axios from "axios";
import authHeader from "../../services/auth-header";
import url from "../../../util/url";

const UploadImage = () => {
    const {handleSubmit, register, errors} = useForm();
    const history = useHistory();
    const [cookies] = useCookies([
        "id",
        "email",
        "password",
        "username",
    ]);
    const [image, setImage] = useState(null);

    const [uploadedImage, setUploadedImage] = useState({});

    let message = "";
    let submitButton = "";
    let picture = "";

    if (image !== null) {
        picture = <img className={"wallpaper__img"} src={image} alt=""/>;
        submitButton = (
            <button
                onClick={() => {
                    Axios.post(`http://localhost:8080/addwallpaper/${cookies.id}`, { <!-- ez meg mi a csuda?  -->
                        image: image,
                    }, {headers: authHeader(cookies.user)}).then((r) => {
                        console.log(r);
                        history.push("/profile");
                    });
                }}
            >
                Upload
            </button>
        );
        message = <p>Click on upload if you can see your wallpaper</p>;
    }

    if (uploadedImage.size > 0) {
        const objectURL = window.URL.createObjectURL(uploadedImage);

        picture = <img className={"wallpaper__img"} src={objectURL} alt=""/>;
        URL.revokeObjectURL(uploadedImage);
        let formData = new FormData();
        formData.append("file", uploadedImage);

        submitButton = (
            <button
                onClick={() => {
                    Axios.post(
                        url.uploaded_service +  `/uploaded/uploadwallpaper/${cookies.id}`,
                        formData,
                        {headers: {"Content-Type": "multipart/form-data"},}
                    ).then((r) => {
                        console.log(r);
                        history.push("/profile");
                    });
                }}
            >
                Upload
            </button>
        );
        message = <p>Click on upload if you can see your wallpaper</p>;
    }

    const onSubmit = (values) => {
        setUploadedImage(values.file[0]);
        setImage(values.image);
    };

    return (
        <React.Fragment>
            <h2 className="loginHeader">Upload an image</h2>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                        id={"upload-button"}
                        name="file"
                        type="file"
                        placeholder="file"
                        accept="image/png, image/jpeg"
                        ref={register({
                            required: true,
                        })}
                    />

                    {errors.email && errors.email.message}
                    <button type="submit" className="button">
                        Submit
                    </button>
                </form>
            </div>

            <div className={"wallpaper__container"}>
                {picture}
                {message}
                {submitButton}
            </div>
        </React.Fragment>
    );
};

export default UploadImage;


