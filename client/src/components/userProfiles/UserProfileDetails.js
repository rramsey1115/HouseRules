import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserProfileById } from "../../managers/profileManager";

export const UserProfileDetails = () => {
    const id = useParams().id;
    const [user, setUser] = useState({});

    useEffect(() => {
        if (id)
        {
            getAndSetUser(id * 1);
        }
    },[id])
    
    const getAndSetUser = (userId) => {
        getUserProfileById(userId).then(data => setUser(data))
    }

    console.log('user', user);
    console.log('id', id);
    
    return (
        <div className="container">
            <div className="header">
                <h1>User Profile Details</h1>
            </div>
            <div className="body">
                <h4>{`${user.firstName} ${user.lastName}`}</h4>
                <h5>{user.email}</h5>
            </div>
        </div>)
}