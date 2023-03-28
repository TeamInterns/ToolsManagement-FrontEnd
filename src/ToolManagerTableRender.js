function ToolManagerTableRender({state}){

    const ToolsTableContents = JSON.parse(JSON.stringify(state.data));
    ToolsTableContents.pop();

    return (
        <div className="admin-table-container">
      <br></br>
      <br></br>
      <h1>List of All tools in the Inventory</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tool Number</th>
            <th>Manufacturer</th>
            <th>Max usage Capacity</th>
            <th>Number Of time Used</th>
            <th>Price</th>
            <th>Usage Status</th>
            <th>Uses Left</th>
            <th>Worn Out Limit</th>
            <th>Worn Out percentage</th>
          </tr>
        </thead>
        <tbody>
            {
                ToolsTableContents.map(dataArray=>{
                    return(
                        <tr key={dataArray.tool_object_Id}>
                            <td>{dataArray.tool_object_Id}</td>
                            <td>{dataArray.manufacturer}</td>
                            <td>{dataArray.max_usage_capacity}</td>
                            <td>{dataArray.no_of_times_used}</td>
                            <td>{dataArray.price}</td>
                            <td>{dataArray.usage_status.toString()}</td>
                            <td>{dataArray.uses_left}</td>
                            <td>{dataArray.wornOut_limit}</td>
                            <td>{dataArray.worn_out_percentage}</td>


                        </tr>
                    );
                })
            }
          
        </tbody>
      </table>
    </div>
    )

}
export default ToolManagerTableRender;