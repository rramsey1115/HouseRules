import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { assignChore, getChoreById, unAssignChore } from "../../managers/choreManager";
import { Spinner, Table } from "reactstrap";
import { getUserProfiles } from "../../managers/profileManager";

export const ChoreDetails = () => {
    const choreId = useParams().id;
    const [chore, setChore] = useState();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if(parseInt(choreId))
        {
            getAndSetChoreById(choreId);
            getAndSetAllUsers();
        }
    }, [choreId]);

    const getAndSetChoreById = (choreId) => {
        getChoreById(choreId).then(setChore);
    }

    const getAndSetAllUsers = () => {
        getUserProfiles().then(setAllUsers);
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

    const unAssign = (userId) => {
        assignChore(choreId, userId).then(() => getAndSetAllUsers())
    }

    const assign = (userId) => {
        unAssignChore(choreId, userId).then(() => getAndSetAllUsers())
    }

    return !chore || allUsers.length < 1 
    ? <Spinner /> 
    : <div className="container">
        <div className="header" style={{borderBottom:"1px solid"}}>
            <h1>Chore Details</h1>
        </div>
        <div className="body">
            <Table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{chore.name}</td>
                    </tr>
                    <tr>
                        <th>Difficulty</th>
                        <td>{chore.id}</td>
                    </tr>
                    <tr>
                        <th>Assignments</th>
                        <td>
                            {allUsers.map(u => {
                                const arr = u.choreAssignments.filter(a => a.choreId === chore.id)
                                return (
                                    <div key={u.id}>
                                        <input 
                                            type="checkbox"
                                            checked={arr.length > 0 ? true : false}
                                            value={u.id}
                                            onChange={(e) => e.target.checked === true ? unAssign(e.target.value * 1) : assign(e.target.value * 1)}
                                        />{" "}
                                        {u.firstName}
                                    </div>
                                )
                            })}
                        </td>
                    </tr>
                    <tr>
                        <th>Last Completed</th>
                        <td>
                            <p>
                                {chore.choreCompletions.length > 0 
                                ? `${getFormattedDate(chore.choreCompletions[0]?.completedOn)} by ${chore.choreCompletions[0]?.userProfile?.firstName}` 
                                : ""}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    </div>

}