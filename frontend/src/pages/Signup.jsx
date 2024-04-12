import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center w-1/4">
        <div className="rounded-lg bg-white text-center">
          <Heading label="Sign Up" />
          <SubHeading text="Enter your information to create an account." />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            placeholder="ABC"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            placeholder="XYZ"
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="abc@xxx.com"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="*********"
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:5000/api/v1/user/signup",
                {
                  firstName,
                  lastName,
                  email,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            text="Sign Up"
          />
          <BottomWarning
            text="Already a Member?"
            buttonText="Login here"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
