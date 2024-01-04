import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserProfileById } from "../../managers/profileManager";

export const UserProfileDetails = () => {
    const id = useParams().id;
    const [user, setUser] = useState({});

    useEffect(() => {
        if(id)
        {
            getAndSetUser(id);
        }
    },[id])
    
    const getAndSetUser = () => {
        getUserProfileById(id).then(setUser)
    }

    console.log('user', user);
    
    return (
        <div className="container">
            <div className="header">
                <h1>User Profile Details</h1>
            </div>
            <div className="body">
                <h4>Details... Details... Details... Details...</h4>
            </div>
        </div>)
}