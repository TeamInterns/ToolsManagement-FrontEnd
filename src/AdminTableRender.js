import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from './Img/logo.png';
import {FaTools} from 'react-icons/fa';

const AdminTableRender = ({ state }) => {
  const adminTableContents = JSON.parse(JSON.stringify(state.data));
  adminTableContents.pop();

  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img className="logo" src={logo} alt="Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/manageusers">Manage Users</Nav.Link>
              <Nav.Link href="/managetools">Manage Tools</Nav.Link>
              
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
      <h2>MASTER TABLE DATA</h2>
      <br></br>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tool ID</th>
            <th>Tool Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {adminTableContents.map((tool) => (
            <tr key={tool.toolId}>
              <td>{tool.toolId}</td>
              <td><FaTools className="fa"/>{tool.toolName}</td>
              <td>{tool.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminTableRender;



