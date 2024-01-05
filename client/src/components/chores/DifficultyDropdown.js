import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"

export const DifficultyDropdown = ({choreObj, setChoreObj}) => {
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const values = [1, 2, 3, 4, 5]

    const toggle2 = () => {console.log('dropdown2', dropdown2Open); setDropdown2Open((prevState) => !prevState);}

    return (
        <Dropdown isOpen={dropdown2Open} toggle={toggle2}>
            <DropdownToggle 
                caret 
                color="primary"
                style={{
                    width:200,
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
                }}
                >{choreObj.difficulty > 0 ? `${choreObj.difficulty}` : "Choose Difficulty"}
            </DropdownToggle>
            <DropdownMenu 
                style={{
                    width:250,
                    height:"fit-content"
                }}>
                <DropdownItem>{`1 (least) to 5 (most)`}</DropdownItem>
                <DropdownItem divider></DropdownItem>
                {values.map(v => {
                    return (
                        <DropdownItem
                            key={v}
                            value={v}
                            onClick={(e) => {
                                const copy = {...choreObj};
                                copy.difficulty = e.target.value * 1;
                                setChoreObj(copy);
                            }}
                            >{v}
                        </DropdownItem>
                    )
                })}
            </DropdownMenu>
        </Dropdown>
    );
}