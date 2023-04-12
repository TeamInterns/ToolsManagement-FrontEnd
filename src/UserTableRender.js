import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from './Img/logo.png'
import {FaTools} from 'react-icons/fa';

function UserTableRender({state}){

    const userTableContents = JSON.parse(JSON.stringify(state.data));
    const userRole=userTableContents.pop();
    
    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img className="logo" src={logo} alt="Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link className="addlink" to={{pathname:"/addTools"}} state={{userRole:userRole}}> Add Tools</Link>
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
      <h2>USER OWNED TOOLS</h2>
      <br></br>
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
            <th>Worn Out percentage</th>
          </tr>
        </thead>
        <tbody>
            {
                userTableContents.map(dataArray=>{
                    return(
                        <tr key={dataArray.tool_object_Id}>
                            <td>{dataArray.tool_object_Id}</td>
                            <td><FaTools className="fa"/>{dataArray.master.toolName}</td>
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