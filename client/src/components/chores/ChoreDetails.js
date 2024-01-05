import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getChoreById } from "../../managers/choreManager";
import { Spinner, Table } from "reactstrap";

export const ChoreDetails = () => {
    const id = useParams().id;
    const [chore, setChore] = useState();

    useEffect(() => {
        if(parseInt(id))
        {
            getAndSetChoreById(id)
        }
    }, [id]);

    const getAndSetChoreById = (id) => {
        getChoreById(id).then(setChore);
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

    console.log('chore', chore);
    return !chore ? <Spinner /> :
    <div className="container">
        <div className="header">
            <h1>Chore Details</h1>
        </div>
        <div className="body">
            <Table>
                <thead>
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
                        <td><div>
                            {chore.choreAssignments?.map(ca => {
                            return (
                                <p key={ca.id}>{`${ca.userProfile.firstName} ${ca.userProfile.lastName}`}</p>
                            )
                        })}</div></td>
                    </tr>
                    <tr>
                        <th>Completed On</th>
                        <td>
                            {chore.choreCompletions?.map(cp => {
                                let recent = null;
                                if(recent)
                                {
                                    if(recent.completedOn > cp.completedOn)
                                    {
                                        recent = cp;
                                    }
                                }
                                else
                                {
                                    recent = cp;
                                }
                                return (
                                    <p key={cp.id}>{getFormattedDate(recent.completedOn)}</p>
                                )})
                            }
                        </td>
                    </tr>
                </thead>
            </Table>
        </div>
    </div>

}