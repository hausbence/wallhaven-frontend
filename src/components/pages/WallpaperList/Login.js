import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import './Login.css';


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
            setCookie("email", values.email, {path : "/"} )
            setCookie("password", values.password, {path : "/"})
        }
    }
    if (login) {
        console.log(cookies);
    }

    const StyledLogin = styled.div`
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      flex-flow: column;
      width: 200px;
      height: 200px;
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
        margin: 5px;
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
      margin: 5px;
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