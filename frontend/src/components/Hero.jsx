import React from "react";
import Signin from "../pages/Signin";
import Heading from "./Heading";

const Hero = () => {
  return (
    <section className="h-screen flex justify-center items-center bg-white dark:bg-blue-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
            Welcome to FinEase
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            Finesse all you transactions and Payments with Ease.
          </p>
        </div>
        <Signin />
      </div>
    </section>
  );
};

export default Hero;
