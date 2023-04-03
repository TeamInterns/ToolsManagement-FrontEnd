import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const AdminTableRender = ({ state }) => {
  const adminTableContents = JSON.parse(JSON.stringify(state.data));
  adminTableContents.pop();

  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ThoughtClan</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">About</Nav.Link>
              <NavDropdown title="Tools">
                <NavDropdown.Item href="#action/3.1">Spanner</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Hammer</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Plier</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
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
      <h1>Master Table Data</h1>
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
              <td>{tool.toolName}</td>
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



