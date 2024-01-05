import { useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { DaysDropdown } from "./DaysDropdown";
import { DifficultyDropdown } from "./DifficultyDropdown";

export const CreateChore = () => {
    const [choreObj, setChoreObj] = useState({
        name: "",
        difficulty: 0,
        choreFrequencyDays: 0
    });

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
                <FormGroup style={{width:500, display:"flex", justifyContent:"space-between"}}>
                    <Label><><h5>Chore Frequency</h5></>
                        <DaysDropdown choreObj={choreObj} setChoreObj={setChoreObj}/>
                    </Label>
                    <Label><h5>Chore Difficulty</h5>
                        {/* <DifficultyDropdown choreObj={choreObj} setChoreObj={setChoreObj}/> */}
                    </Label>
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
                    >
                    Submit
                </Button>
            </div>
        </div>
    </div>)
}