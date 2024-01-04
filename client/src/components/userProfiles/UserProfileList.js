import { useState } from "react"
import { getUserProfiles } from "../../managers/profileManager";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    const getAndSetAllUsers = () => {
        getUserProfiles().then(setUsers);
    }


    return (
    <div className="container">
        <h1>UserProfileList</h1>
    </div>)
}