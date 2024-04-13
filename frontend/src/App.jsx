import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoneyCard from "./pages/SendMoney";
import axios from "axios";
import { RecoilRoot } from "recoil";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticated = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}api/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) setIsAuth(true);
  };

  useEffect(() => {
    isAuthenticated();
  }, [isAuth]);

  return (
    <RecoilRoot>
      <div className="font-redditmono">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Dashboard /> : <Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoneyCard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
};

export default App;
