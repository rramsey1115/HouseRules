import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"

export const DaysDropdown = ({choreObj, setChoreObj}) => {
    const [dropdown1Open, setDropdown1Open] = useState(false);
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

    const toggle1 = () => {console.log('dropdown1', dropdown1Open); setDropdown1Open((prevState) => !prevState)}

    return (
        <Dropdown isOpen={dropdown1Open} toggle={toggle1}>
            <DropdownToggle 
                caret 
                color="primary"
                style={{
                    width:200,
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
                }}
                >{choreObj.choreFrequencyDays > 0 ? `${choreObj.choreFrequencyDays}` : "Choose Frequency"}
            </DropdownToggle>
            <DropdownMenu style={{ width:250, height:"fit-content"}}>
                    <DropdownItem>{`Chore Frequency in Days`}</DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    {values.map(v => { return (
                        <DropdownItem
                            key={v}
                            value={v}
                            onSelect={(e) => {
                                const copy = {...choreObj}
                                copy.choreFrequencyDays = e.target.value * 1
                                setChoreObj(copy)
                                toggle1()
                            }}
                        >{v}
                    </DropdownItem>)})}
            </DropdownMenu>
        </Dropdown>
    );
}