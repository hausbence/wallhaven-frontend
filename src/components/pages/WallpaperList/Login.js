import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";


const Login = () => {
    const { handleSubmit, register, errors } = useForm();
    const [login, setLogin] = useState(false)
    const onSubmit = (values) => {
        Axios.get(`http://localhost:8080/login/${values.email}/${values.password}`).then(r =>
            setLogin(r.data)
        )
        console.log(values);
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