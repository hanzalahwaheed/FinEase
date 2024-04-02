import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center">
          <Heading label="Sign Up" />
          <SubHeading
            text="Enter your information to create an account"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
