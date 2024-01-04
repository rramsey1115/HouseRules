import { useEffect, useState } from "react"
import { getUserProfiles } from "../../managers/profileManager";
import { Spinner, Table } from "reactstrap";

export const UserProfileList = ({ loggedInUser }) => {
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
                    {users.map(u => {
                    let choreCount = u.choreAssignments.length;
                    let completedCount = u.choreCompletions.length;
                    return (<tr key={`userId ${u.id}`}>
                        <td>{u.id}</td>
                        <td>{`${u.firstName} ${u.lastName}`}</td>
                        <td>{u.email}</td>
                        <td>{u.userName}</td>
                        <td>{choreCount}</td>
                        <td>{completedCount}</td>
                    </tr>)}
                    )}
                </tbody>
            </Table>
        </div>
    </div>
}