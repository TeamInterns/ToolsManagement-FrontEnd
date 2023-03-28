import React from 'react';
import './AdminTable.css';

const AdminTableRender = ({ state }) => {
  const adminTableContents = JSON.parse(JSON.stringify(state.data));
  adminTableContents.pop();

  return (
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
          </tr>
        </thead>
        <tbody>
          {adminTableContents.map((tool) => (
            <tr key={tool.toolId}>
              <td>{tool.toolId}</td>
              <td>{tool.toolName}</td>
              <td>{tool.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTableRender;
