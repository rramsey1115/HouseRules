import { useEffect, useState } from "react"
import { completeChore, getAllChores, getMyAssignments } from "../../managers/choreManager";
import { Button, Table } from "reactstrap";

export const MyChores = ({ loggedInUser }) => {
    const id = loggedInUser.id;
    const [myAssignments, setMyAssignments] = useState([]);

    useEffect(() => { getAndSetMyAssignments() }, [id])

    const getAndSetMyAssignments = () => {
        getMyAssignments(id).then((res) => {
            const filtered = res.filter(r => r.chore.overdue == true); 
            setMyAssignments(filtered);
        });
    }

    return(
        <div className="container">
            <div className="header" style={{display:"flex", justifyContent:'space-between', alignItems:"center", borderBottom:"1px solid black"}}>
                <h1>My Overdue Chores</h1>
            </div>
            <div className="body">
               {myAssignments.length === 0 
               ? <h4>No Current Assignments</h4> 
               : <Table className="my-assignments">
                    <tbody>
                        {myAssignments?.map(a => { return (
                            <tr key={a.id}>
                                <th>{a.chore.name}</th>
                                <td>
                                    <Button
                                        size="md"
                                        color="primary"
                                        value={a.chore.id * 1}
                                        onClick={(e) => completeChore(e.target.value, id).then(() => getAndSetMyAssignments()) }
                                    >Complete
                                    </Button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
            </Table>}
            </div>
        </div>)
}