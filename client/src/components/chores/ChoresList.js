import { useEffect, useState } from "react"
import { completeChore, deleteChoreById, getAllChores } from "../../managers/choreManager";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const ChoresList = ({ loggedInUser }) => {
    const [allChores, setAllChores] = useState([]);
    const userId = loggedInUser.id * 1;

    useEffect(() => { getAndSetAllChores() }, []);

    const getAndSetAllChores = () => { getAllChores().then(setAllChores) };

    const navigate = useNavigate();

    const handleDelete = (id) => {
        deleteChoreById(id).then(() => getAndSetAllChores());
    };

    return (
    <div className="container">
        <div className="header" style={{display:"flex", justifyContent:'space-between', alignItems:"center", borderBottom:"1px solid black"}}>
            <h1>All Chores</h1>
            {loggedInUser.roles.includes("Admin") && (
                <Button
                    size="md"
                    color="primary"
                    style={{height:40}}
                    onClick={() => navigate('create')}
                    >Add Chore +
                </Button>
            )}
        </div>
        <div className="body">
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Difficulty</th>
                        <th>Frequency Days</th>
                        <th>Complete</th>
                        {loggedInUser.roles.includes("Admin") && (
                            <>
                            <th>Details</th>
                            <th>Delete</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {allChores.map(c => {
                        return (
                        <tr key={c.id}>
                            {c.overdue == true 
                                ? <td style={{color:"red"}}>{c.name}</td> 
                                : <td>{c.name}</td> }
                            <td>{c.difficulty}</td>
                            <td>{c.choreFrequencyDays}</td>
                            <td>
                                <Button
                                    value={c.id * 1}
                                    color="success"
                                    onClick={(e) => {completeChore(e.target.value, userId).then(() => getAndSetAllChores())}}
                                >Complete
                                </Button>
                            </td>
                        {loggedInUser.roles.includes("Admin") && (
                            <>
                            <td>
                                <Button
                                    value={c.id}
                                    color="primary"
                                    onClick={(e) => navigate(`${e.target.value}`)}
                                >Details
                                </Button>
                            </td>
                            <td>
                                <Button
                                    value={c.id}
                                    color="danger"
                                    onClick={(e) => handleDelete(e.target.value)}
                                >Delete
                                </Button>
                            </td>
                            </>
                            )}
                        </tr>
                    )})}
                </tbody>
            </Table>
        </div>
    </div>)
}