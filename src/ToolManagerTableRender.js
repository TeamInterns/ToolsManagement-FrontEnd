import { useEffect, useState } from "react";

function ToolManagerTableRender({ state }) {
  const MasterTableContents = JSON.parse(JSON.stringify(state.data));
  MasterTableContents.pop();

  const [selectedToolId, setSelectedToolId] = useState(
    MasterTableContents.map(() => {
      return false;
    })
  );
  const [ToolsTabledata,setToolsTabledata]=useState([]);

  

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
      .then((data) => setToolsTabledata(data))
      .catch((error) => console.error(error));

  };

  return (
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
              {selectedToolId[tool.toolId - 1] && ToolsTabledata.map((toolData)=>
              (
                <>
                  <tr>
                  <td colSpan="3">
                    <table>
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
                        <tr>
                          <td>{toolData.tool_object_Id}</td>
                          <td>{toolData.master.toolName}</td>
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
                      </tbody>
                    </table>
                  </td>
                </tr>
                </>

              )) }
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToolManagerTableRender;
