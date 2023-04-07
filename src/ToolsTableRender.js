import { useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import logo from './Img/logo.png';
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import {FaTools} from 'react-icons/fa';

function ToolsTableRender() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const data = state.data;
    console.log(data)
    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img className="logo" src={logo} alt="Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/notifications">Notifications</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <div className="breadcrumps">
          <span>
            <span className="breadcrump" onClick={()=>{navigate(-1);}}>Dashboard </span>
            /
            <span className="breadcrump" onClick={()=>{window.location.reload(false)}}> Tool Objects</span>
          </span>
          </div>         
        <div className="admin-table-container">
        <br></br>
        
        <h2>LIST OF ALL TOOL OBJECTS</h2>
        <br></br>
        <table className="admin-table">
        <thead>
          <tr>
            <th>Tool Instance ID</th>
            <th>Tool Name</th>
            <th>Manufacturer</th>
            <th>Max Usage Capacity</th>
            <th>Number Of Times Used</th>
            <th>Price</th>
            <th>Usage status</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Wourn Out Limit</th>
            <th>Worn Out Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((toolData) => (
            <tr key={toolData.tool_object_Id}>
              <td>{toolData.tool_object_Id}</td>
              <td><FaTools className="fa"/>{toolData.master.toolName}</td>
              <td>{toolData.manufacturer}</td>
              <td>{toolData.max_usage_capacity}</td>
              <td>{toolData.no_of_times_used}</td>
              <td>{toolData.price}</td>
              <td>{toolData.usage_status.toString()}</td>
              <td>{toolData.user.name}</td>
              <td>{toolData.user.role}</td>
              <td>{toolData.wornOut_limit}</td>
              <td>{toolData.worn_out_percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </>
    );
  }
 export default ToolsTableRender;  