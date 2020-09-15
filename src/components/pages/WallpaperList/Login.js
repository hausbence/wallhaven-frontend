import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import { useCookies } from "react-cookie";


const Login = () => {
    const { handleSubmit, register, errors } = useForm();
    const [login, setLogin] = useState(false)
    const [cookies, setCookie] = useCookies(["email", "password"]);
    const onSubmit = (values) => {
        Axios.get(`http://localhost:8080/login/${values.email}/${values.password}`).then(r =>
            setLogin(r.data)
        )
        console.log(values);
        if (login) {
            setCookie("email", values.email )
            setCookie("password", values.password)
        }
    }

    let logged = "";
    if (login) {
        logged = "logged in";
    }
    else {
        logged = "not logged in"
    }

    return (
        <React.Fragment>
            <h1>{logged}</h1>
            <h2>{cookies.email}</h2>
            <h2>{cookies.password}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="email"
                    type="email"
                    ref={register({
                        required: true,
                    })}
                />
                {errors.email && errors.email.message}
                <input
                    name="password"
                    type="password"
                    ref={register({
                        required: true,
                        minLength: 2,
                        maxLength: 16,
                    })}
                />
                {errors.password && errors.password.message}

                <button type="submit">Submit</button>
            </form>
        </React.Fragment>
    );
};

export default Login;