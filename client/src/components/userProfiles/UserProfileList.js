import { useEffect, useState } from "react"
import { getUserProfiles } from "../../managers/profileManager";
import { Spinner, Table } from "reactstrap";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {getAndSetAllUsers()}, [])

    const getAndSetAllUsers = () => {
        getUserProfiles().then(setUsers);
    }

    console.log(users);
    return !users.length ? <Spinner /> : 
    <div className="container">
        <div className="header">
            <h1>UserProfileList</h1>
        </div>
        <div className="body">
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Chores</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>num</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    </div>
}