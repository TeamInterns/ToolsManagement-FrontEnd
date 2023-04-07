import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './Img/logo.png';

const Home = () => {



    return (
        <div>
           <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
        <img className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"></Nav.Link>
           
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
        <h2>TOOL MANAGEMENT SYSTEM</h2>

        <h3 style={{marginTop:"5%"}}>Welcome!!!</h3>

        <div className="buttons">
          <a href="/login" className="button">LOGIN</a>
          <a href="/signup" className="button">SIGNUP</a>
        </div>
               
      </Container>
    </div>
        </div>
    )
}

export default Home;   
