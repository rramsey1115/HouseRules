export const Home = () => {
    return (
    <div className="container">
        <div className="header" style={{borderBottom:"1px solid", marginBottom:20}}>
            <h1>Home</h1>
        </div>
        <div className="body">
            <div style={{marginBottom:30}}>
                <h4>About</h4>
                <p>House Rules is a Full-Stack .NET application built with a React.js client and C# with PostgreSQL server on the server-side.</p>
                <p><span style={{fontWeight:"bold"}}>Administrator</span> users are able to view all data about chore details, chore assignments, chore completions, user profile details, and user chore assignments.</p>
                <p><span style={{fontWeight:"bold"}}>All logged-in users</span> are able to view a list of chores to complete and when they were last completed, as well as a list of their individual assigned chores which are past due for completion. </p>
            </div>
            <div style={{marginBottom:30}}>
                <h4>Key Learning Objectives:</h4>
                <ul>
                    <li>Authentication sing Identity Framework and EF Core</li>
                    <li>Role-based authorization</li>
                    <li>Creating endpoints with controller methods</li>
                    <li>Dependency injection with constructors and fields</li>
                    <li>Routing with attributes</li>
                    <li>Server-side validation</li>
                </ul>
            </div>
            <div style={{marginBottom:30}}>
                <h4>Skills Used</h4>
                <table>
                    <tbody>
                        <tr>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/121405384-444d7300-c95d-11eb-959f-913020d3bf90.png" alt="C#" title="C#"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/121405754-b4f48f80-c95d-11eb-8893-fc325bde617f.png" alt=".NET Core" title=".NET Core"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/></td>
                        </tr>
                        <tr>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" alt="Bootstrap" title="Bootstrap"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="Visual Studio Code" title="Visual Studio Code"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/></td>
                            <td style={{padding:10}}><img width="60" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="Swagger" title="Swagger"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}