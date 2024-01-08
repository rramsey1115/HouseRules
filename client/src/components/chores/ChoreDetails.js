import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { assignChore, editChore, getChoreById, unAssignChore } from "../../managers/choreManager";
import { Button, Form, FormGroup, FormText, Input, Label, Spinner, Table } from "reactstrap";
import { getUserProfiles } from "../../managers/profileManager";

export const ChoreDetails = () => {
    const choreId = useParams().id;
    const [chore, setChore] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [choreName, setChoreName] = useState("");
    const [choreDiff, setChoreDiff] = useState(0);
    const [choreFreq, setChoreFreq] = useState(0);
    const [editHidden, setEditHidden] = useState(true);

    useEffect(() => {
        if(parseInt(choreId))
        {
            getAndSetChoreById(choreId);
            getAndSetAllUsers();
        }
    }, [choreId]);

    useEffect(() => {
        if(chore)
        {
            setChoreName(chore.name);
            setChoreDiff(chore.difficulty);
            setChoreFreq(chore.choreFrequencyDays);
        }
    }, [chore]);

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
        assignChore(choreId, userId).then(() => getAndSetChoreById(choreId)).then(() => getAndSetAllUsers())
    }

    const assign = (userId) => {
        unAssignChore(choreId, userId).then(() => getAndSetChoreById(choreId)).then(() => getAndSetAllUsers())
    }

    const handleSave = () => {
        const obj = {
            name: choreName,
            difficulty: choreDiff,
            choreFrequencyDays: choreFreq
        }
        editChore(choreId, obj).then(() => navigate('/chores'))
    }

    const dayValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const diffValues = [1,2,3,4,5];
    const navigate = useNavigate();

    return !chore || allUsers.length < 1 
    ? <Spinner /> 
    : <div className="container">
        <div className="header" style={{borderBottom:"1px solid", marginBottom:20}}>
            <h1>Chore Details</h1>
        </div>
        <div className="body">
            <div className="details">
                <Table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{choreName}</td>
                        </tr>
                        <tr>
                            <th>Difficulty</th>
                            <td>{choreDiff}</td>
                        </tr>
                        <tr>
                            <th>Frequency</th>
                            <td>{choreFreq}</td>
                        </tr>
                        <tr>
                            <th>Last Completed On: </th>
                            <td>
                                {chore.choreCompletions.length > 0 
                                ? <p>{getFormattedDate(chore.choreCompletions[0]?.completedOn)} by {chore.choreCompletions[0]?.userProfile?.firstName}</p> 
                                : ""}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button
                    size="md"
                    color={editHidden===true ? "primary" : "secondary"}
                    onClick={(e) => setEditHidden(!editHidden)}
                    >Edit Chore
                </Button>
            </div>
            <div className="edit" hidden={editHidden}>
                <div className="header" style={{borderBottom:"1px solid", marginBottom:20, marginTop:20}}>
                    <h1>Edit Chore</h1>
                </div>
                <Form>
                    <FormGroup>
                        <label style={{width:180}}>
                            <h5>Chore Name</h5>
                        </label>
                        <input 
                            style={{marginLeft:10, width:200, height:30}}
                            value={choreName}
                            type="text"
                            onChange={(e) => {
                                setChoreName(e.target.value);
                            }}/>
                    </FormGroup>
                    <FormGroup>
                        <label style={{width:180}}>
                            <h5>Chore Frequency</h5>
                        </label>
                        <select 
                            style={{marginLeft:10, width:100, height:30}}
                            name="days" 
                            defaultValue={choreFreq}
                            onChange={(e) => {
                                setChoreFreq(e.target.value * 1)
                            }}>
                            {dayValues.map(dv => { return (
                                <option
                                    key={dv}
                                    value={dv}
                                    name="days"
                                >{dv}
                                </option>)})}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label style={{width:180}}>
                            <h5>Chore Difficulty</h5>
                        </label>
                        <select 
                            style={{marginLeft:10, width:100, height:30}}
                            name="diff" 
                            defaultValue={choreDiff}
                            onChange={(e) => {
                                setChoreDiff(e.target.value * 1)
                            }}>
                            {diffValues.map(d => { return (
                                <option
                                    key={d}
                                    value={d}
                                    name="diff"
                                >{d}
                                </option>)})}
                        </select>
                    </FormGroup>
                </Form>
                <div className="button-container" 
                    hidden={chore.name == choreName &&
                            chore.difficulty == choreDiff &&
                            chore.choreFrequencyDays == choreFreq 
                            ? true 
                            : false}>
                    <Button
                        color="success"
                        onClick={(e) => handleSave()}
                    >Save Changes
                    </Button>
                </div>
            </div>
            <div className="assignments">
                <div className="header" style={{borderBottom:"1px solid", marginBottom:20, marginTop:20}}>
                    <h1>Assign Chore</h1>
                </div>
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
                    </div>)
                })}
            </div>
        </div>
    </div>

}