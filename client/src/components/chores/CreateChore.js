import { useState } from "react"
import { Form, FormGroup, Input, Label } from "reactstrap"

export const CreateChore = () => {
    const [choreObj, setChoreObj] = useState({
        name:"",
        difficulty:0,
        frequencyDays:0
    });

    return (
    <div className="container">
        <div className="header">
            <h1>Create Chore</h1>
        </div>
        <div className="body">
            <Form>
                <FormGroup>
                        <Input 
                            type="text" 
                            name="name" 
                            autoComplete="true" 
                            placeholder="Chore Name" 
                            style={{width:500}}/>
                </FormGroup>
            </Form>
        </div>
    </div>)
}