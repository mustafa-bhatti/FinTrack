import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div
        className="flex align-center justify-evenly h-30vh pt-[80px] bg-blue-900"
        id="hero"
      >
        <div className="pt-[15%] text-white">
          <h1 className="text-4xl mb-[15px] font-semibold">
            Welcome to FinTrack!
          </h1>
          <p className="w-[500px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur molestias repellat autem.{" "}
          </p>
          <button className=" rounded-2xl pt-[5px] pb-[5px] pl-[20px] pr-[20px] mt-[50px] text-center font-[18px]  bg-blue-700 hover:bg-blue-400 hover:text-black cursor-pointer text-xl font-medium">
            <Link to="/signup">Get Started &rarr;</Link>
          </button>
        </div>
        <div className="landing-img">
          <img
            src="/public/hero-img2.png"
            alt="heroimage"
            className="w-[600px] "
          />
        </div>
      </div>
    </>
  );
}

export default Hero;
