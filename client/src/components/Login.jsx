import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import loginImg from "../assets/landingPage/signup.png";
import Footer from "./Footer";
function Login() {
  return (
    <>
      <div className="bg-green-50 h-[100%] max-md:h-full md:h-[100vh] ">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-[125px] cursor-pointer pl-[10px] pb-[10px] pt-[10px]"
            />
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center max-md:flex max-md:flex-col-reverse lg:flex-row">
          <div className=" flex flex-col items-center justify-center m-auto gap-[10px]">
            <h2 className="text-2xl text-[green] font-semibold">LogIn</h2>
            <form
              action=""
              className="flex flex-col gap-[15px]  pt-[40px] pb-[40px] pl-[30px] pr-[30px] border-3 rounded-md border-green-100 hover:border-green-200 max-md:mt-[40px] max-md:mb-[40px] max-md:border-green-200 md:p-[15px]"
            >
              <div>
                <label htmlFor="userEmail" className="text-left">
                  Email:
                </label>
                <br />
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="email"
                  required
                  className="rounded-sm  pt-[4px] pb-[4px] pl-[3px] pr-[3px] w-[350px]  bg-white max-md:w-auto"
                />
              </div>
              <div>
                <label htmlFor="userPasword" className="text-left">
                  Password:
                </label>
                <br />
                <input
                  type="password"
                  name="userPasword"
                  id="userPasword"
                  maxLength={5}
                  placeholder="password"
                  required
                  className="rounded-sm  pt-[4px] pb-[4px] pl-[3px] pr-[3px] w-[350px]  bg-white max-md:w-auto"
                />
              </div>
              <div className=" flex flex-col items-center justify-center mt-[10px] ">
                <input
                  type="button"
                  value="LogIn"
                  className=" rounded-2xl bg-black text-white pt-[5px] pb-[5px] pl-[20px] pr-[20px] w-[100px] mb-[15px] hover:cursor-pointer "
                />
                <p>
                  Did not have Account? |{" "}
                  <Link to="/signup" className="text-[green] font-semibold">
                    SignUp
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div>
            <img src={loginImg} alt="" width={600} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
