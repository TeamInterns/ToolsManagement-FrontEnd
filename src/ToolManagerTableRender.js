import { useState } from 'react';

function ToolManagerTableRender({state}){

  const ToolsTableContents = JSON.parse(JSON.stringify(state.data));
  ToolsTableContents.pop();

  const [selectedTool, setSelectedTool] = useState(null);

  const handleRowClick = (tool) => {
    setSelectedTool(tool);
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
          {ToolsTableContents.map((tool) => (
            <tr key={tool.toolId} onClick={() => handleRowClick(tool)}>
              <td>{tool.toolId}</td>
              <td>{tool.toolName}</td>
              <td>{tool.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTool && (
        <div>
          <h2>{selectedTool.toolName}</h2>
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default ToolManagerTableRender;