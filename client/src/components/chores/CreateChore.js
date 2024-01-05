import { useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createChore } from "../../managers/choreManager";
import { useNavigate } from "react-router-dom";

export const CreateChore = () => {
    const [choreObj, setChoreObj] = useState({
        name: "",
        difficulty: 0,
        choreFrequencyDays: 0
    });

    const dayValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const diffValues = [1,2,3,4,5]

    const navigate = useNavigate();

    const handleSubmit = () => {
        createChore(choreObj).then(() => navigate('/chores') )
    }

    return (
    <div className="container">
        <div className="header" style={{borderBottom:"1px solid"}}>
            <h1>Create Chore</h1>
        </div>
        <div className="body">
            <Form style={{marginTop:20}}>
                <FormGroup>
                    <Label><h5>Chore Name</h5>
                        <Input 
                            type="text" 
                            name="name" 
                            autoComplete="true" 
                            placeholder="Chore Name"
                            value={choreObj?.name}
                            onChange={(e) => {
                                const copy = {...choreObj}
                                copy.name = e.target.value
                                setChoreObj(copy)
                                }
                            }
                            style={{width:500}}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <label style={{width:175}}>
                        <h5>Chore Frequency</h5>
                    </label>
                    <select 
                        style={{marginLeft:10, width:100, height:30}}
                        name="days" 
                        onChange={(e) => {
                            const copy = {...choreObj}
                            copy.choreFrequencyDays = (e.target.value * 1)
                            setChoreObj(copy)
                        }}
                    >
                        <option value={0}>Days</option>
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
                    <label style={{width:175}}>
                        <h5>Chore Difficulty</h5>
                    </label>
                    <select 
                        style={{marginLeft:10, width:100, height:30}}
                        name="diff" 
                        onChange={(e) => {
                            const copy = {...choreObj}
                            copy.difficulty = (e.target.value * 1)
                            setChoreObj(copy)
                        }}
                        >
                        <option value={0}>Difficulty</option>
                        {diffValues.map(d => { return (
                            <option
                                key={d}
                                value={d}
                                name="diff"
                            >{d}
                            </option>)
                        })}
                    </select>
                </FormGroup>
            </Form>
            <div className="button-container">
                <Button
                    disabled={
                        choreObj.name.length >= 3 &&
                        choreObj.choreFrequencyDays > 0 &&
                        choreObj.difficulty > 0 ? false : true
                    }
                    color="success"
                    style={{width:200}}
                    onClick={() => {
                        handleSubmit()
                    }}
                    >
                    Submit
                </Button>
            </div>
        </div>
    </div>)
}