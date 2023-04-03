import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Notifications = () => {
    
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const response = fetch('http://localhost:8585/user/showNotifications',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
              } 
        })
          .then(response => response.json())
          .then(data => {setNotifications(data);
        console.log(data)})
          .catch(error => console.error(error));
      },[]);


      function ApproveRequest(){

      }


      function DeclineRequest(notificationID)
      {
          console.log(notificationID);
          
            fetch(`http://localhost:8585/user/deleteNotification/${notificationID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
              //   body: JSON.stringify(notificationID)
            })
            .then(response => {
              console.log(response);
                // handle success response
                const updatedNotifications = notifications.filter(notification => notification.notificationID !== notificationID);
                setNotifications(updatedNotifications);
            }).catch(error => console.error(error));    
      
      }
    


  return (
    <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dash">ThoughtClan</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/notifications">Notifications</Nav.Link>
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
      <h1>Master Table Data</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Notification ID</th>
            <th>Tool Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Master ID</th>
            <th>User ID</th>
            <th>Approve</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification,index) => (
            <tr key={notification.notificationID}>
              <td>{notification.notificationID}</td>
              <td>{notification.toolName}</td>
              <td>{notification.quantity}</td>
              <td>{notification.status.toString()}</td>
              <td>{notification.master.toolId}</td>
              <td>{notification.user.id}</td>
              <td><button  type="button" className="btn btn-success"onClick={()=>{ApproveRequest()}}>Approve</button></td>
              <td><button  type="button" className="btn btn-danger" onClick={()=>{DeclineRequest(notification.notificationID)}}>Decline</button></td>
              </tr>
              ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Notifications