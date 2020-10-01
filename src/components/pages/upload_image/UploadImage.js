import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import "./uploadImage.css";
import Axios from "axios";

const UploadImage = () => {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();
  const [cookies] = useCookies(["id", "email", "password", "username"]);
  const [image, setImage] = useState(null);

  let message = "";
  let submitButton = "";
  let picture = "";
  if (image !== null) {
    picture = <img className={"wallpaper_img"} src={image} alt="" />;
    submitButton = (
      <button
        className={"button"}
        onClick={() => {
          Axios.post(`http://localhost:8080/addwallpaper/${cookies.id}`, {
            image: image,
          }).then((r) => {
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
    setImage(values.image);
  };

  return (
    <React.Fragment>
      <div className="form">
        <h2 className="loginHeader">Upload an image</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input-style"
            id={"image"}
            name="image"
            type="text"
            placeholder="image url"
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
      <div className={"wallpaper_container"}>
        {message}
        {submitButton}
        {picture}
      </div>
    </React.Fragment>
  );
};

export default UploadImage;
