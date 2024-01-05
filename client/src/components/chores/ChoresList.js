import { useEffect, useState } from "react"
import { deleteChoreById, getAllChores } from "../../managers/choreManager";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const ChoresList = ({ loggedInUser }) => {
    const [allChores, setAllChores] = useState([]);

    useEffect(() => { getAndSetAllChores() }, []);

    const getAndSetAllChores = () => { getAllChores().then(setAllChores) };

    const navigate = useNavigate();

    const handleDelete = (id) => {
        deleteChoreById(id).then(() => getAndSetAllChores());
    };

    return (
    <div className="container">
        <div className="header" style={{display:"flex", justifyContent:'space-between'}}>
            <h1>Chores List</h1>
            <Button
                size="lg"
                color="primary"
                onClick={() => navigate('create')}
                >Add Chore +
            </Button>
        </div>
        <div className="body">
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Difficulty</th>
                        <th>Frequency Days</th>
                        {loggedInUser.roles.includes("Admin") && (
                            <>
                            <th>Edit</th>
                            <th>Delete</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {allChores.map(c => {
                        return (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.difficulty}</td>
                            <td>{c.choreFrequencyDays}</td>
                        {loggedInUser.roles.includes("Admin") && (
                            <>
                            <td>
                                <Button
                                    id="edit-chore-btn"
                                    value={c.id}
                                    color="primary"
                                    onClick={(e) => navigate(`${e.target.value}`)}
                                >Edit
                                </Button>
                            </td>
                            <td>
                                <Button
                                    id="delete-chore-btn"
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