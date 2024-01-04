import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserProfileById } from "../../managers/profileManager";
import { Spinner, Table } from "reactstrap";

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

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString); // {object Date}
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formatted = mm + "-" + dd + "-" + yyyy;
        return formatted;
      };

    console.log('user', user);
    
    return !user ? <Spinner /> :
        <div className="container">
            <div className="header">
                <h1>User Profile Details</h1>
            </div>
            <div className="body">
                <Table style={{marginTop:20}}>
                    <tbody>
                        <tr>
                            <th><h4>Name</h4></th>
                            <td><h5>{`${user.firstName} ${user.lastName}`}</h5></td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <td>{user.userName}</td>
                        </tr>
                        <tr>
                            <th>Chore Assignments</th>
                            <td>
                                {user.choreAssignments?.map(ca => {
                                    return ca.chore.dateCompleted 
                                        ? null 
                                        : <p key={ca.chore.id}>{ca.chore.name}</p>
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <th>Completed Chores</th>
                            <td>
                                {user.choreCompletions?.map(cp => {
                                    return <p key={cp.id}>{cp.chore.name} {getFormattedDate(cp.completedOn)}</p>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td></td>
                        </tr>
                        <tr>
                            <th></th>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
}