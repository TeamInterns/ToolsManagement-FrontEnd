import { useLocation } from "react-router-dom";

function ToolsTableRender() {
    const { state } = useLocation();

    const data = state.data;
    console.log(data)
    return (
        <div className="admin-table-container">
        <br></br>
        <br></br>
        <h1>List of all Tool objects</h1>
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
          ))}
        </tbody>
      </table>
      </div>
    );
  }
 export default ToolsTableRender;  