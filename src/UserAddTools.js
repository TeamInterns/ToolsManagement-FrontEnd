import React, { useState, useEffect } from 'react'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useLocation } from 'react-router-dom';


function UserAddTools() {
    const [tools, setTools] = useState([]);
    const [counters, setCounters] = useState([]);

    const location=useLocation();
    const {state}=location;
    useEffect(()=>{
      console.log(state.userRole.userId)
    },[])
   
    const userid = state.userRole.userId

  useEffect(() => {
    const response = fetch('http://localhost:8585/api/getAllTools',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
          } 
    })
      .then(response => response.json())
      .then(data => setTools(data))
      .catch(error => console.error(error));
  },[]);

  // let [num, setNum]= useState(0);
//   let incNum =()=>{
//     if(num<10)
//     {
//     setNum(Number(num)+1);
//     }
//   };
//   let decNum = () => {
//      if(num>0)
//      {
//       setNum(num - 1);
//      }
//   }
//  let handleChange = (e)=>{
//    setNum(e.target.value);
//   }


useEffect(()=>{
  const initialCounters = tools.map(tool => 0);
  setCounters(initialCounters);
  },[tools])

  function notifcationRequest(toolId,toolName,index,userid)
  {
      console.log(toolId,toolName,index,userid)
  }




  return (
    <div>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ThoughtClan</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">About</Nav.Link>
              <Nav.Link href="/addTools">Add Tools</Nav.Link>
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
            <th>Tool ID</th>
            <th>Tool Name</th>
            <th>Quantity</th>
            <th>Add tool</th>
            <th>Request tool</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool,index) => (
            <tr key={tool.toolId}>
              <td>{tool.toolId}</td>
              <td>{tool.toolName}</td>
              <td>{tool.quantity}</td>
              <td>
              {/* <button type="button" class="btn btn-secondary" onClick={incNum}>+</button>
              <span style={{marginRight:"10%", marginLeft:"10%"}}>{num}</span>
              <button type="button" class="btn btn-secondary" onClick={decNum}>-</button> */}

                {/* <button type="button" class="btn btn-secondary" onClick={() => setNum(num + 1)}>+</button>
                <span style={{marginRight:"10%", marginLeft:"10%"}}>{num}</span>
                <button type="button" class="btn btn-secondary" onClick={() => setNum(num - 1)}>-</button> */}

              <button type="button" className="btn btn-secondary" onClick={() => {
                const newCounters = [...counters];
                newCounters[index]++;  
                setCounters(newCounters);
              }}>+</button>
              <span style={{marginRight:"10%", marginLeft:"10%"}}>{counters[index]}</span>
              <button type="button" className="btn btn-secondary" onClick={() => {
                const newCounters = [...counters];
                newCounters[index]--;
                setCounters(newCounters); 
              }}>-</button>
              </td>
              <td><button  type="button" className="btn btn-primary" onClick={()=>
              notifcationRequest(tool.toolId,tool.toolName,counters[index],userid)}>Request</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default UserAddTools