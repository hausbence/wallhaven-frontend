import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {useCookies} from "react-cookie";
import styled from "styled-components";
import './Login.css';

const Login = () => {
    const [id, setId] = useState(0)
    const {handleSubmit, register, errors} = useForm();
    const [login, setLogin] = useState(false);
    const [cookies, setCookie] = useCookies(["id","email", "password"]);
    const onSubmit = (values) => {
        Axios.get(
            `http://localhost:8080/login/${values.email}/${values.password}`
        ).then((r) => setLogin(r.data));
        console.log(values);
        if (login) {
            console.log(values.email)
            setCookie("email", values.email, {path: "/"});
            setCookie("password", values.password, {path: "/"});
        }
    };
    if (login) {
        console.log(cookies.email);
        console.log(id)
    }
    useEffect(() => {
        Axios.get(`http://localhost:8080/id/${cookies.email}`).then((r => {
            setId(r.data)
            console.log(r)
        }))
        setCookie("id", id, {path: "/"})
    }, [login])

    const StyledLogin = styled.div`
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      flex-flow: column;
      width: 350px;
      height: 350px;
      padding: 50px;
      margin: 0 auto;
      border: 1px solid lightgray;
      background: #88888;
      
    
      h2 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
      }

      button {
        background: #aaaaaa;
        color: #fff;
        transform: translateX(23%);
        padding: 10px;
        margin-top: 24px;
        margin-left: 50px;
        width: 100px;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
      }
      
      button:hover {
        background-color: #888888;
      }
  `;

    const StyledInput = styled.input`
      border: 1px solid #000;
      padding: 10px;
      margin-left: 50px;
      margin-top: 15px;
      width: 150px;
      box-sizing: border-box;
    `;

    return (
        <React.Fragment>
            <h2 className="loginHeader">Login</h2>
            <StyledLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <StyledInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        ref={register({
                            required: true,
                        })}
                    />
                    {errors.email && errors.email.message}
                    <StyledInput
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

                    <button type="submit">Submit</button>
                </form>
            </StyledLogin>
        </React.Fragment>
    );
};

export default Login;
