import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import logo from './Img/logo.png';
import {FaTools,FaCog} from 'react-icons/fa';
import Modal from 'react-modal';

const ManageTools = () => {
    const [toolName, setToolName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [tools, setTools] = useState([]);
    const [del,setDel]=useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [approve,setApprove]=useState(false);
    const [newQuantity, setNewQuantity] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        const response = fetch("http://localhost:8585/api/getAllTools", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => setTools(data))
          .catch((error) => console.error(error));
      }, [approve,del]);

        function DeleteTool(toolId){
             console.log(toolId);
          
            fetch(`http://localhost:8585/api/removeTool/${toolId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
              //   body: JSON.stringify(notificationID)
            })
            .then(response => {
              console.log(response);
                // handle success response
                setDel(!del)
                
               
            }).catch(error => console.error(error)); 
        }


        const handleSubmit = async (event) => {
            event.preventDefault();
            let data ={
                toolName: toolName,
                quantity: quantity
            }
        
            try {
              const response = await fetch('http://localhost:8585/api/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
        
              if (response.ok) {
                // handle successful response here
              } else {
                // handle error response here
              }
            } catch (error) {
              // handle fetch error here
            }
            setToolName('')
            setQuantity(0)
            setModalOpen(false);
            setApprove(!approve);
          };

          const handleQuantityChange = (event) => {
            setNewQuantity(event.target.value);
          }

          const handleFormSubmit = (toolId) => {
            const data= {
              "toolId":toolId,
              "quantity":newQuantity
            }
            // Fetch API and send new quantity value
            fetch(`http://localhost:8585/api/updateExistingToolQuantity/${toolId}/${newQuantity}`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(response => response.json())
              .then(data => {
                // Handle response data
                console.log(data);
              })
              .catch(error => {
                // Handle error
                console.error(error);
              });
          }
        
          const [editToolId, setEditToolId] = useState(null);
        
          const handleEditClick = (toolId) => {
            setEditToolId(toolId);
          }
        
          const handleCancelClick = () => {
            setEditToolId(null);
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
            <span className="breadcrump" onClick={()=>{window.location.reload(false)}}> Manage Tools</span>
          </span>
          </div>     
      <div className="admin-table-container">
        <br></br>
        <h2>MASTER TABLE DATA</h2>
        <br></br>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tool ID</th>
              <th>Tool Name</th>
              <th>Quantity</th>              
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, index) => (
              <tr key={tool.toolId}>
                <td>{tool.toolId}</td>
                <td><FaTools className="fa"/>{tool.toolName}</td>
                <td className="edit">{editToolId === tool.toolId ? (
                <form  onSubmit={() => handleFormSubmit(tool.toolId)}>
                  <input className="editform" type="number" value={newQuantity} onChange={handleQuantityChange} />
                  <button className="btn btn-success editform" type="submit">Save</button>
                  <button className="btn btn-danger editform" type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
              ) : (
                <>
                  {tool.quantity}
                  <button className="faw" onClick={() => handleEditClick(tool.toolId)}><FaCog /></button>
                </>
              )}
                     
                      </td>

                <td>                 
                    <button
                      type="button"
                      className="btn btn-danger" onClick={()=>{DeleteTool(tool.toolId)}}
                    >
                      Delete
                    </button>                  
                </td>
              </tr>
            ))}
            
            
          </tbody>
        </table>
        <div> <button type="button" className="btn btn-primary adding" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
         onClick={() => setModalOpen(true)}>
       Add Tool
       </button>
       <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="model">
        <form onSubmit={handleSubmit} className="modelform">
          <label className="modellabel">
            Tool Name:
            <input type="text" value={toolName} onChange={(e) => setToolName(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <label className="modellabel">
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>
          <br></br>
          <br></br>
          <button type="submit" className="btn btn-primary modelButton">Add Tool</button>
        </form>
      </Modal>
        </div>
        
      </div>
      </div>
  )
}

export default ManageTools