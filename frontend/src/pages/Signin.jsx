import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userState from "../store";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  return (
    // <div className="bg-zinc-800 h-screen flex justify-center">
      <div className="flex flex-col justify-center w-1/2">
        <div className="rounded-lg bg-blue-500/30 text-center">
          <Heading label="Sign In" />
          <SubHeading text="Enter your credentials to access your account." />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="abc@xxx.com"
          />
          <InputBox
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="*********"
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BASE_URL}api/v1/user/signin`,
                {
                  email,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              setUser(response.data.user.firstName);
              navigate("/dashboard");
            }}
            text="Sign In"
          />
          <BottomWarning
            text="New User? Sign Up"
            buttonText="here"
            to="/signup"
          />
        </div>
      </div>
    // </div>
  );
};

export default Signin;
