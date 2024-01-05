import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"

export const DaysDropdown = ({choreObj, setChoreObj}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                >Chore Frequency
            </DropdownToggle>
            <DropdownMenu 
                style={{
                    width:250, 
                    height:200, 
                    overflowY:"scroll"
                }}>
              <DropdownItem header>Chore Frequency in Days</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>1</DropdownItem>
              <DropdownItem>2</DropdownItem>
              <DropdownItem>3</DropdownItem>
              <DropdownItem>4</DropdownItem>
              <DropdownItem>5</DropdownItem>
              <DropdownItem>6</DropdownItem>
              <DropdownItem>7</DropdownItem>
              <DropdownItem>8</DropdownItem>
              <DropdownItem>9</DropdownItem>
              <DropdownItem>10</DropdownItem>
              <DropdownItem>11</DropdownItem>
              <DropdownItem>12</DropdownItem>
              <DropdownItem>13</DropdownItem>
              <DropdownItem>14</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}