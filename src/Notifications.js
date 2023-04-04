import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
    
    const [notifications, setNotifications] = useState([]);
    const [approve,setApprove]=useState(false);
    const [decline,setDecline]=useState(false);
    console.log(notifications)
  

    useEffect(() => {
        const response = fetch('http://localhost:8585/user/showNotifications',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
              } 
        })
          .then(response => response.json())
          .then(data => {setNotifications(data);
        })
          .catch(error => console.error(error));
      },[approve,decline]);


      function ApproveRequest(notificationId,toolName,manufacturer,quantity,masterToolId,userId){
        const data={
          "quantity":quantity,
          "manufacturer":manufacturer,
          "max_usage_capacity":100.00,
          "no_of_times_used":100,
          "worn_out_percentage":100,
          "price":500000.00,
          "wornOut_limit":30.00,
          "uses_left":3,
          "usage_status":true,
          "master":
              {   
                  "toolId":masterToolId
              },
          "user":
              {
                  "id":userId
              }  
      }
      // call the api to when approved
      fetch("http://localhost:8585/user/approveRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      console.log(notificationId)
      DeclineRequest(notificationId)

      toast('The request has been Approved', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      // handle success response
    });
    

        

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
                setDecline(!decline)
                
               
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
      <h1>Notifcations</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Notification ID</th>
            <th>Tool Name</th>
            <th>Manufacturer</th>
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
              <td>{notification.manufacturer}</td>
              <td>{notification.quantity}</td>
              <td>{notification.status.toString()}</td>
              <td>{notification.master.toolId}</td>
              <td>{notification.user.id}</td>
              <td><button  type="button" className="btn btn-success"onClick={()=>{ApproveRequest(notification.notificationID,notification.toolName,notification.manufacturer,notification.quantity,notification.master.toolId,notification.user.id)}}>Approve</button>
              <ToastContainer/>
              </td>
              <td>
                <button  type="button" className="btn btn-danger" onClick={()=>{DeclineRequest(notification.notificationID)}}>Decline</button>
                
                </td>
              
              </tr>
              ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Notifications