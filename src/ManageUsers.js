import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import logo from './Img/logo.png';
import {FaUser} from 'react-icons/fa';

const ManageUsers = () => {

  const [users, setUsers] = useState([]);
  const [blocked, setBlocked] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
      const response = fetch("http://localhost:8585/api/showUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {setUsers(data);
        console.log(data)})
        .catch((error) => console.error(error));
    }, );

    function blockUser(id){
      console.log(id);          
            fetch(`http://localhost:8585/api/blockUser/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify(id)
            })
            .then(response => {
              console.log(response);
                // handle success response
                const newData = { ...blocked };
                newData[id] = true;
                setBlocked(newData);                               
            }).catch(error => console.error(error)); 
    }


  return (
    <div>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/"><img className="logo" src={logo} alt="Logo" /></Navbar.Brand>
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
  <div className="breadcrumps">
          <span>
            <span className="breadcrump" onClick={()=>{navigate(-1);}}>Dashboard </span>
            /
            <span className="breadcrump" onClick={()=>{window.location.reload(false)}}> Manage Users</span>
          </span>
          </div>
          <div className="admin-table-container">
        <br></br>
        <h2>USER DETAILS</h2>
        <br></br>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
               <th>Email</th>  
                
               <th>Role</th>        
              <th>Block User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><FaUser className="fa"/>{user.name}</td>
                <td>{user.email}</td>
                
                <td>{user.role}</td>

                <td>  
                {blocked[user.id]||(user.isblocked==1) ? (
                    "Blocked"
                  ) : (               
                    <button
                      type="button"
                      className="btn btn-danger" onClick={()=>{blockUser(user.id)}}
                    >
                      Block
                    </button> )}  

                </td>
              </tr>
            ))}
            
            
          </tbody>
        </table>  
        <div><button type="button" class="btn btn-primary adding" onClick={()=>{navigate("/signup")}}>
       Add User
       </button></div>
        </div> 
        
    </div>
  )
}

export default ManageUsers