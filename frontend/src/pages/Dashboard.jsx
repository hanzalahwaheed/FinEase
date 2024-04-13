import { useEffect, useState } from "react";
import Appbar from "../components/Appbar.jsx";
import Balance from "../components/Balance.jsx";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const getBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      const response = await axios.get(`${BASE_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const isAuthenticated = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    isAuthenticated();
    getBalance();
  }, []);

  return (
    <div>
      <Appbar />
      <Balance value={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
