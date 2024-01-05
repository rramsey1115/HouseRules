import { useState } from "react"
import { Form, FormGroup, Input, Label } from "reactstrap"
import { DaysDropdown } from "./DaysDropdown";
import { DifficultyDropdown } from "./DifficultyDropdown";

export const CreateChore = () => {
    const [choreObj, setChoreObj] = useState({
        name:"",
        difficulty:0,
        choreFrequencyDays:0
    });

    return (
    <div className="container">
        <div className="header" style={{borderBottom:"1px solid"}}>
            <h1>Create Chore</h1>
        </div>
        <div className="body">
            <Form style={{marginTop:20}}>
                <FormGroup>
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
                            style={{width:500}}/>
                </FormGroup>
                <FormGroup style={{width:500, display:"flex", justifyContent:"space-between"}}>
                    <DaysDropdown choreObj={choreObj} setChoreObj={setChoreObj}/>
                    <DifficultyDropdown choreObj={choreObj} setChoreObj={setChoreObj}/>
                </FormGroup>
                <FormGroup>
                </FormGroup>
            </Form>
        </div>
    </div>)
}