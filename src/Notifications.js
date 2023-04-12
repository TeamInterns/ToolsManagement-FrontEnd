import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './Img/logo.png';
import { useNavigate } from 'react-router-dom';
import {FaTools} from 'react-icons/fa';
import Modal from 'react-modal';

const Notifications = () => {
    
    const [notifications, setNotifications] = useState([]);
    const [approve,setApprove]=useState(false);
    const [decline,setDecline]=useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [max,setMax] = useState(0);
    const [price,setPrice] = useState(0);
    const [notimes,setNotimes] = useState(0);
    const [wornoutp,setWornoutp] = useState(0);
    const [wornoutl,setWornoutl] = useState(0);
    const [uses,setUses] = useState(0);
    console.log(notifications)
    const navigate = useNavigate();
  

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
          "max_usage_capacity":max,
          "no_of_times_used":notimes,
          "worn_out_percentage":wornoutp,
          "price":price,
          "wornOut_limit":wornoutl,
          "uses_left":uses,
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
      console.log(notificationId);
      setMax(0);
      setNotimes(0);
      setPrice(0);
      setUses(0);
      setWornoutl(0);
      setWornoutp(0);
      setModalOpen(false);
      DeclineRequest(notificationId)

     
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
                toast('The request has been Declined', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                });
               
            }).catch(error => console.error(error));    
      
      }
    


  return (
    <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dash"><img className="logo" src={logo} alt="Logo" /></Navbar.Brand>
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
            <span className="breadcrump" onClick={()=>{window.location.reload(false)}}> Notifications</span>
          </span>
          </div>  
      <div className="admin-table-container">

      <br></br>
      <h2>NOTIFICATIONS</h2>
      <br></br>
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
              <td><FaTools className="fa"/>{notification.toolName}</td>
              <td>{notification.manufacturer}</td>
              <td>{notification.quantity}</td>
              <td>{notification.status.toString()}</td>
              <td>{notification.master.toolId}</td>
              <td>{notification.user.id}</td>
              <td><button  type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
         onClick={() => setModalOpen(true)}>Approve</button>
         <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="models">
        <form onSubmit={()=>{ApproveRequest(notification.notificationID,notification.toolName,notification.manufacturer,notification.quantity,notification.master.toolId,notification.user.id)}} className="modelform">
          <label className="modellabel">
            Max Usage Capacity:
            <input type="text" value={max} onChange={(e) => setMax(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <label className="modellabel">
            No of Times Used:
            <input type="number" value={notimes} onChange={(e) => setNotimes(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <label className="modellabel">
            Worn Out %:
            <input type="number" value={wornoutp} onChange={(e) => setWornoutp(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <label className="modellabel">
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <label className="modellabel">
            Worn Out Limit:
            <input type="number" value={wornoutl} onChange={(e) => setWornoutl(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <label className="modellabel">
            Uses Left:
            <input type="number" value={uses} onChange={(e) => setUses(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <button type="submit"  class="btn btn-primary modelButton">Approve</button>
        </form>
      </Modal>
      
              </td>
              <td>
                <button  type="button" className="btn btn-danger" onClick={()=>{DeclineRequest(notification.notificationID)}}>Decline</button>
                <ToastContainer/>
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


//onClick={()=>{ApproveRequest(notification.notificationID,notification.toolName,notification.manufacturer,notification.quantity,notification.master.toolId,notification.user.id)}}