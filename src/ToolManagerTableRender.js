import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';

function ToolManagerTableRender({ state }) {
  const MasterTableContents = JSON.parse(JSON.stringify(state.data));
  MasterTableContents.pop();

  const [selectedToolId, setSelectedToolId] = useState(
    MasterTableContents.map(() => {
      return false;
    })
  );
  const [ToolsTabledata,setToolsTabledata]=useState([]);

  const navigate = useNavigate();

    // function to handle every Row selected. Call the api to request tool
    const handleRowClick = (tool) => {
      let clickedToolId = MasterTableContents.map(() => {
        return false;
      });
      clickedToolId[tool.toolId - 1] = true;
      setSelectedToolId(clickedToolId);
    
      const response = fetch(`http://localhost:8585/ToolObjects/getToolObjectsByToolId/${tool.toolId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setToolsTabledata(data);
          console.log(data);
          navigate("/toolsrender", { state: { data: data } });
        })
        .catch((error) => console.error(error));
    };
    

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ThoughtClan</Navbar.Brand>
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
      <h1>List of All tools in the Inventory</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tool ID</th>
            <th>Tool Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {MasterTableContents.map((tool) => (
            <>
              <tr key={tool.toolId} onClick={() => handleRowClick(tool)}>
                <td>{tool.toolId}</td>
                <td>{tool.toolName}</td>
                <td>{tool.quantity}</td>
              </tr>

            </>
          ))}
          
        </tbody>
      </table>
    </div>
    </>
  );
}
 
export default ToolManagerTableRender;