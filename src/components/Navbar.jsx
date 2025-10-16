import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="flex flex-row items-center justify-between pl-[13px] pr-[13px]  border-b w-[100%] fixed bg-white">
        <div className="flex flex-row">
          <img
            src="./public/logo-crop3.png"
            alt="logo"
            className="w-[200px] "
          />
        </div>

        <ul className="flex flex-row items-center justify-between gap-10 font-medium ">
          <li className=" hover:text-blue-700 hover:font-[500]">
            {" "}
            <a href="#hero" className="text-[18px]">
              Home
            </a>{" "}
          </li>
          <li className=" hover:text-blue-700 hover:font-[500]">
            {" "}
            <a href="#about" className="text-[18px]">
              About
            </a>{" "}
          </li>
          <li className=" font hover:text-blue-700 hover:font-[500]">
            <a href="#features" className=" text-[18px]">
              Features
            </a>{" "}
          </li>
          <li className=" font hover:text-blue-700 hover:font-[500]">
            <button className="rounded-sm bg-blue-700 pt-[7px] pb-[7px] pl-[14px] pr-[14px] text-white">
              <Link to="/signup" className=" text-[18px]">
                SignUp
              </Link>
            </button>{" "}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
