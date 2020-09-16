import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {useCookies} from "react-cookie";
import './Login.css';
import {useHistory} from "react-router-dom";


const Login = () => {
    const [id, setId] = useState(0)
    const {handleSubmit, register, errors} = useForm();
    const history = useHistory();
    const [login, setLogin] = useState(false);
    const [cookies, setCookie] = useCookies(["id", "email", "password"]);
    const onSubmit = (values) => {
        Axios.get(
            `http://localhost:8080/login/${values?.email}/${values?.password}`
        ).then((r) => setLogin(r.data))
        setTimeout(() => {
            Axios.get(`http://localhost:8080/id/${values?.email}`).then((r => {
                setId(r.data)
                console.log(r)
            }));
        }, 500)
        console.log(values);
        if (login && id !== 0) {
            console.log(values.email)
            setCookie("id", id, {path: "/"})
            setCookie("email", values.email, {path: "/"});
            setCookie("password", values.password, {path: "/"});
            history.push({
                pathname: `/`,
            });
        }

    };

    return (
        <React.Fragment>
            <h2 className="loginHeader">Login</h2>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="input-style"
                           name="email"
                           type="email"
                           placeholder="Email"
                           ref={register({
                               required: true,
                           })}
                    />
                    {errors.email && errors.email.message}
                    <input className="input-style"
                           name="password"
                           type="password"
                           placeholder="Password"
                           ref={register({
                               required: true,
                               minLength: 2,
                               maxLength: 16,
                           })}
                    />
                    {errors.password && errors.password.message}

                    <button type="submit" className="button">Submit</button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Login;
