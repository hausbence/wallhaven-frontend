import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {useCookies} from "react-cookie";


const UpdateProfile = () => {
    const [userData, setUserData] = useState([])
    const {handleSubmit, register, errors} = useForm();
    const [cookies, setCookie] = useCookies(["id", "email", "password"]);
    const [nameAvailable, setNameAvailable] = useState(true)


    const url = "http://localhost:8080"

    const nameCheck = (values) => {
        return new Promise(resolve => {
            Axios.get(url + "/available/name/" + values.name).then(r => {
                resolve(r.data)
            })
        })
    }
    const emailCheck = (values) => {
        return new Promise(resolve => {
            Axios.get(url + "/available/email/" + values.email).then(r => {
                resolve(r.data)
            })
        })
    }


    async function nameUpdate(values) {
        const result = await nameCheck(values)
        console.log(result)
        if (!result) {
            updateUsername(values)
        }
        else {
            alert("this name is already used")
        }
    }
    async function emailUpdate(values) {
        const result = await emailCheck(values)
        console.log(result)
        if (!result) {
            updateEmail(values)
        }
        else {
            alert("this email is already used")
        }
    }

    const onSubmitUsername = (values) => {
        nameUpdate(values).then()
    }

    function updateUsername(values) {
        Axios.post(url + "/update/name/" + values.name + "/" + cookies.id).then(r => {
            console.log(r)
        })
    }
    function updateEmail(values) {
        Axios.post(url + "/update/email/" + values.email + "/" + cookies.id).then(r => {
            console.log(r)
        })
    }

    const onSubmitEmail = (values) => {
        console.log(values)
        emailUpdate(values).then();
    }


    const newEmail = <div className="update__newEmail">
        <form onSubmit={handleSubmit(onSubmitEmail)}>
            <input name={"email"} type={"email"} placeholder={userData?.email} ref={register({
                required: true,
            })}/>
            <button type={"submit"} className="update__submitBtn">Submit</button>
        </form>
    </div>

    const newUsername = <div className="update__newUsername">
        <form onSubmit={handleSubmit(onSubmitUsername)}>
            <input name={"name"} type={"text"} placeholder={userData?.name} ref={register({
                required: true,
            })}/>
            <button type={"submit"} className="update__submitBtn">Submit</button>
        </form>
    </div>


    useEffect(() => {
        Axios.get(url + "/data/" + cookies.id).then(r =>
            setUserData(r.data))
    }, [userData])
    let content = <div><h1>Loading...</h1></div>

    if (userData) {
        content = <div>
            <p>{userData?.email}</p>
            <p>{userData?.name}</p>


            {newEmail}
            {newUsername}

        </div>
    }

    return content
}

export default UpdateProfile;