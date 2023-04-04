import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";

import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserAddTools() {
  const [tools, setTools] = useState([]);
  const [counters, setCounters] = useState([]);

  const location = useLocation();
  const { state } = location;

  const userid = state.userRole.userId;
  const [requested, setRequested] = useState({});

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
  }, []);

  useEffect(() => {
    const initialCounters = tools.map((tool) => 0);
    setCounters(initialCounters);
  }, [tools]);

  function notifcationRequest(toolId, toolName, counterValue, userid) {
    console.log(toolId, toolName, counterValue, userid);

    const data = {
      master: {
        toolId: toolId,
      },
      toolName: toolName,
      user: {
        id: userid,
      },
      quantity: counterValue,
      manufacturer: "TATA", // Get this from the Tools Table
    };

    fetch("http://localhost:8585/user/addNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      const newData = { ...requested };
      newData[toolId] = true;
      setRequested(newData);
      toast('Your request has been sent successfully', {
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

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ThoughtClan</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">About</Nav.Link> */}
              <Nav.Link href="/addTools">Add Tools</Nav.Link>
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
            {tools.map((tool, index) => (
              <tr key={tool.toolId}>
                <td>{tool.toolId}</td>
                <td>{tool.toolName}</td>
                <td>{tool.quantity}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      const newCounters = [...counters];
                      newCounters[index]++;
                      setCounters(newCounters);
                    }}
                  >
                    +
                  </button>
                  <span style={{ marginRight: "10%", marginLeft: "10%" }}>
                    {counters[index]}
                  </span>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      const newCounters = [...counters];
                      newCounters[index]--;
                      setCounters(newCounters);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  {requested[tool.toolId] ? (
                    "Requested"
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        notifcationRequest(
                          tool.toolId,
                          tool.toolName,
                          counters[index],
                          userid
                        )
                      }
                      disabled={requested[tool.toolId]}
                    >
                      Request
                    </button>
                  )}
                </td>
                <ToastContainer/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserAddTools;
