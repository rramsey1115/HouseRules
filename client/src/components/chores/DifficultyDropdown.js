import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"

export const DifficultyDropdown = ({choreObj, setChoreObj}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const values = [1, 2, 3, 4, 5]

    const toggle = () => setDropdownOpen((prevState) => !prevState);


    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle 
                caret 
                color="primary"
                style={{
                    width:200,
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
                }}
                >Chore Difficulty
            </DropdownToggle>
            <DropdownMenu 
                style={{
                    width:250,
                    height:"fit-content"
                }}>
                    <DropdownItem header>{`1 (least) to 5 (most)`}</DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    {values.map(v => {
                        return (
                            <DropdownItem
                                key={v}
                                value={v}
                                onClick={(e) => {
                                    const copy = {...choreObj}
                                    copy.difficulty = e.target.value * 1
                                    setChoreObj(copy)}}
                                >{v}
                            </DropdownItem>
                        )
                    })}
            </DropdownMenu>
        </Dropdown>
    );
}