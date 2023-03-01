import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Home = () => {
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
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link eventKey={2} href="/signup">
              SignUp
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      <Container style={{marginTop:"5%"}}>
        <h1>Tools Management System</h1>
      </Container>
    </div>
        </div>
    )
}

export default Home;   
