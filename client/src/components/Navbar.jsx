import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
function Navbar() {
  return (
    <>
      <div className="flex flex-row items-center justify-between pl-[13px] pr-[13px] pb-[10px] pt-[10px] shadow-md w-[100%] fixed bg-white  max-md:flex-col max-md:pb-[10px]">
        <div className="flex flex-row">
          <a href="#hero">
            <img src={logo} alt="logo" className="w-[125px] cursor-pointer" />
          </a>
        </div>

        <ul className="flex flex-row items-center justify-between gap-10  font-medium max-md:font-light max-md: text-xs max-md:gap-5">
          <li className=" hover:text-green-500 hover:font-[500] max-md:hover:text-green-500 ">
            {" "}
            <a href="#hero" className="text-[18px]">
              Home
            </a>{" "}
          </li>
          <li className=" hover:text-green-500 hover:font-[500] max-md:hover:text-green-500 ">
            {" "}
            <a href="#about" className="text-[18px]">
              About
            </a>{" "}
          </li>
          <li className="hover:text-green-500 hover:font-[500] max-md:hover:text-green-500 ">
            <a href="#features" className=" text-[18px]">
              Features
            </a>{" "}
          </li>
          <li className=" hover:text-blue-700 hover:font-[500]">
            <button className="rounded-sm bg-green-700 pt-[7px] pb-[7px] pl-[14px] pr-[14px] text-white hover:bg-green-500 max-md:hover:bg-green-500 ">
              <Link to="/signup" className=" text-[18px]">
                SignUp
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
