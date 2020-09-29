import React, {useEffect, useState} from "react";
import Axios from "axios";
import './users.css'
import {useCookies} from "react-cookie";

const Users = () => {
    const [added, setAdded] = useState([])
    const [users, setUsers ] = useState([])
    const [cookies, setCookie] = useCookies(["id","email", "password"]);

    function extracted() {
        Axios.get(
            `http://localhost:8080/users/${cookies.id}`
        ).then((r) => setUsers(r.data));
    }

    useEffect(() => {
        extracted();
    }, [])


    console.log(cookies)
    const addFriend = (id) => {
        Axios.post(`http://localhost:8080/addFriend/${cookies.id}/${id}`, {}).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
        console.log(id)
        setTimeout(() => {
            extracted()
        }, 500);
    }
    console.log(users)
    return (<div className={"user__container"}>
            <h1>Users</h1>
            <React.Fragment>
                {users?.map(user => (
                    <div className={"user__card"}><p>{user.name}</p><button onClick={() => (
                        addFriend(user.id)
                    )}>add friend</button></div>
                ))}
            </React.Fragment>
        </div>

    )
}



export default Users;