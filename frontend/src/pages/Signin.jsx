import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center w-1/4">
        <div className="rounded-lg bg-white text-center">
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
                "http://localhost:5000/api/v1/user/signin",
                {
                  email,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
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
    </div>
  );
};

export default Signin;
