import { useEffect, useState } from "react";
import Appbar from "../components/Appbar.jsx";
import Balance from "../components/Balance.jsx";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const getBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(
        "http://localhost:5000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <Appbar />
      <Balance value={balance} />
      {/* <Users /> */}
    </div>
  );
};

export default Dashboard;
