import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function UserTableRender({state}){

    const userTableContents = JSON.parse(JSON.stringify(state.data));
    const userRole=userTableContents.pop();
    

    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ThoughtClan</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">About</Nav.Link>
              <Link to={{pathname:"/addTools"}} state={{userRole:userRole}}> Add tools</Link>
              {/* <NavDropdown title="Tools">
                <NavDropdown.Item href="#action/3.1">Spanner</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Hammer</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Plier</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <div className="admin-table-container">
      <br></br>
      <br></br>
      <h1>Users Owned Tools</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tool Number</th>
            <th>Tool Name</th>
            <th>Manufacturer</th>
            <th>Max usage Capacity</th>
            <th>Number Of time Used</th>
            <th>Price</th>
            <th>Usage Status</th>
            <th>Uses Left</th>
            <th>Worn Out Limit</th>
            <th>Worn Outpercentage</th>
          </tr>
        </thead>
        <tbody>
            {
                userTableContents.map(dataArray=>{
                    return(
                        <tr key={dataArray.tool_object_Id}>
                            <td>{dataArray.tool_object_Id}</td>
                            <td>{dataArray.master.toolName}</td>
                            <td>{dataArray.manufacturer}</td>
                            <td>{dataArray.max_usage_capacity}</td>
                            <td>{dataArray.no_of_times_used}</td>
                            <td>{dataArray.price}</td>
                            <td>{dataArray.usage_status.toString()}</td>
                            <td>{dataArray.uses_left}</td>
                            <td>{dataArray.wornOut_limit}</td>
                            <td>{dataArray.worn_out_percentage}</td>


                        </tr>
                    );
                })
            }
          
        </tbody>
      </table>
    </div>
    </div>
    )

}
export default UserTableRender;