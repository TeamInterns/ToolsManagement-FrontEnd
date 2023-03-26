import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useLocation} from 'react-router-dom'

const Dashboard = () => {
  const { state } = useLocation();


    return (
        <div>
           <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">ThoughtClan</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">About</Nav.Link>
            {/* <Nav.Link href="#pricing">Tools</Nav.Link> */}
            <NavDropdown title="Tools" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Spanner</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Hammer
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Plier</NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Logout</Nav.Link>
            {/* <Nav.Link eventKey={2} href="/signup">
              SignUp
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      <Container style={{marginTop:"5%"}}>
        <h1>Tools Management System</h1>
            
            <table className="table table-success table-bordered table-hover" style={{marginTop:"5%"}}>
              <thead>
                <tr>
                  <th scope="col">Tool object Id</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col">Max usage capacity</th>
                  <th scope="col">No. of times used</th>
                  <th scope="col">Worn out percentage</th>
                  <th scope="col">Price</th>
                  <th scope="col">Wornout limit</th>
                  <th scope="col">Uses left</th>

                </tr>
              </thead>
              <tbody>
              {state.data.map((tool) => (
                            <tr key={tool.tool_object_Id}>
                            <th scope="col">{tool[0].tool_object_Id}</th>
                            <th scope="col">{tool[0].manufacturer}</th>
                            <th scope="col">{tool[0].max_usage_capacity}</th>
                            <th scope="col">{tool[0].no_of_times_used}</th>
                            <th scope="col">{tool[0].worn_out_percentage}</th>
                            <th scope="col">{tool[0].price}</th>
                            <th scope="col">{tool[0].wornOut_limit}</th>
                            <th scope="col">{tool[0].uses_left}</th>

                            </tr>
                        ))}
              </tbody>
              </table>
               
      </Container>
    </div>
        </div>
    )
}

export default Dashboard;