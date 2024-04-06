import Appbar from "../components/Appbar.jsx";
import Balance from "../components/Balance.jsx";
import { Users } from "../components/Users";

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <Balance value={10000} />
      <Users />
    </div>
  );
};

export default Dashboard;
