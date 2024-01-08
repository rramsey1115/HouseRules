import { useState } from "react"

export const MyChores = ({ loggedInUser }) => {
    const [myChores, setMyChores] = useState([]);
    
    const getAndSetMyChores = () => {
        
    }

    return(
        <div className="container">
            <div className="header" style={{display:"flex", justifyContent:'space-between', alignItems:"center", borderBottom:"1px solid black"}}>
                <h1>My Chores</h1>
            </div>
            <div className="body">
                <h5>Chores list goes here</h5>
            </div>
        </div>
    )
}