import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/landingPage/heroImg (2).png";
function Hero() {
  return (
    <>
      <div
        className="flex align-center justify-evenly h-30vh pt-[80px] bg-white-900 max-md:flex-col "
        id="hero"
      >
        <div className="lg:inline lg:pt-[15%] pl-[10px] max-md:pl-[10px] pr-[10px] pt-[10px] lg:pl-[10px]  max-md:flex max-md:flex-col max-md:text-center max-md:justify-center max-md:m-auto">
          <h1 className="text-5xl mb-[15px] font-semibold text-[green] max-md:text-3xl">
            Welcome to FinTrack!
          </h1>
          <p className="w-[500px] max-md:w-auto leading-7">
            Keeps your money organized. Track income, expenses, and balance all
            in one clean dashboard.
          </p>
          <button
            className=" rounded-2xl pt-[5px] pb-[5px] pl-[20px] pr-[20px] mt-[50px] text-white text-center font-[18px]  bg-green-900
             transition duration-500 ease-in-out transform 
                       hover:-translate-y-1 hover:scale-100 hover:bg-green-500  cursor-pointer text-xl max-md:flex  justify-center m-auto"
          >
            <Link to="/signup">
              Get Started <span className="font-[100px];"> &#10140;</span>
            </Link>
          </button>
        </div>
        <div className="landing-img">
          <img
            src={heroImg}
            alt="heroimage"
            className="w-[600px] max-lg:mt-[50px] "
          />
        </div>
      </div>
    </>
  );
}

export default Hero;
