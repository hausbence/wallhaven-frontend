import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import './uploadImage.css'


const UploadImage = () => {
    const [cookies1, removeCookie] = useCookies(["email", "password", "id", "username"]);
    const {handleSubmit, register, errors} = useForm();
    const history = useHistory();
    const [cookies, setCookie] = useCookies(["id", "email", "password", "username"]);
    const [image, setImage] = useState(null)

    let message = ""
    let submitButton = ""
    let picture = ""
    if (image !== null) {
        picture = <img className={"wallpaper__img"} src={image} alt=""/>
        submitButton = <button>upload</button>
        message = <p>Click on upload if you can see your wallpaper</p>
    }


    const onSubmit = (values) => {
        setImage(values.image)
    }


    return (
        <React.Fragment>
            <h2 className="loginHeader">Upload an image</h2>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="input-style"
                           id={"image"}
                           name="image"
                           type="text"
                           placeholder="image url"
                           ref={register({
                               required: true,
                           })}
                    />
                    {errors.email && errors.email.message}
                    <button type="submit" className="button">Submit</button>
                </form>
            </div>
            <div className={"wallpaper__container"}>
                {picture}
                {message}
                {submitButton}
            </div>
        </React.Fragment>
    )
}


export default UploadImage;