import { useLocation } from "react-router-dom";
import AdminTableRender from "./AdminTableRender";
import NavBar from "./NavBar";
import ToolManagerTableRender from "./ToolManagerTableRender";
import UserTableRender from "./UserTableRender";

const Dashboard = () => {
  const { state } = useLocation();

  const data = state.data;

  const lastObject = data.at(-1);
  const userRole = lastObject["userRole"];

  if (userRole ==="admin") {
    return (
      <div>


        <AdminTableRender state={state} />
      </div>
    );
  } else if (userRole ==="toolManager") {
    return (
      <div>



        <ToolManagerTableRender state={state}/>
      </div>
    );
  } else {
    return (
      <div>


        <UserTableRender state={state}/>
      </div>
    );
  }
};

export default Dashboard;
