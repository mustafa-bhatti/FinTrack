import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  let navMenu;
  let toggleMenu = () => {
    setShowMenu((curr) => (curr === false ? true : false));
  };
  if (showMenu) {
    navMenu = (
      // for mobile and tablet screen
      <div
        className="fixed top-[60px] left-0 h-[100vh] w-[100%] text-white
  bg-gradient-to-b from-[#065f46] via-[#047857] to-[#059669] transition-[height] duration-2000 ease-in-out
  lg:hidden"
      >
        <ul className="flex flex-col items-end justify-between gap-5 pt-[10px] pr-[15px] font-large max-md:font-light max-md: text-xs">
          <li className="hover:font-[500] max-md:hover:text-green-500 ">
            {" "}
            <a
              onClick={() => {
                toggleMenu();
              }}
              href="#hero"
              className="text-[18px] "
            >
              Home
            </a>{" "}
          </li>
          <li className=" hover:text-green-500 hover:font-[500] max-md:hover:text-green-500 ">
            {" "}
            <a
              onClick={() => {
                toggleMenu();
              }}
              href="#about"
              className="text-[18px]"
            >
              About
            </a>{" "}
          </li>
          <li className="hover:text-green-500 hover:font-[500] max-md:hover:text-green-500 ">
            <a
              onClick={() => {
                toggleMenu();
              }}
              href="#features"
              className=" text-[18px]"
            >
              Features
            </a>{" "}
          </li>
          <li className=" hover:text-blue-700 hover:font-[500]">
            <button className="rounded-sm bg-green-500 pt-[7px] pb-[7px] pl-[14px] pr-[14px] text-white hover:bg-green-500 max-md:hover:bg-green-500 shadow-xl/20">
              <Link to="/signup" className=" text-[18px] font-semibold">
                SignUp
              </Link>
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <nav className="flex flex-row items-center justify-between pl-[13px] pr-[13px] pb-[10px] pt-[10px] shadow-md w-[100%] fixed bg-white   max-md:pb-[10px]">
        <div className="flex flex-row">
          <a href="#hero">
            <img src={logo} alt="logo" className="w-[125px] cursor-pointer" />
          </a>
        </div>
        {/* for labtop and desktop screen */}
        <ul className="flex flex-row items-center justify-between gap-10  font-medium max-md:font-light max-md: text-xs max-lg:hidden lg:flex-row">
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

        {/* toggle button for mobile and tablet  screen  */}
        <div className="lg:hidden max-lg:flex-row">
          <MdMenu
            size={"2rem"}
            color="green"
            onClick={() => {
              toggleMenu();
            }}
            className="cursor-pointer "
          />
        </div>
      </nav>
      {navMenu}
    </>
  );
}

export default Navbar;
