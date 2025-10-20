import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-blue-100 h-[100vh]">
      <div className="flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center m-auto gap-[10px]">
          <h2 className="text-2xl">LogIn</h2>
          <form
            action=""
            className="flex flex-col gap-[15px]  pt-[40px] pb-[40px] pl-[30px] pr-[30px] bg-gray-300"
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
                className="rounded-sm  p-[3px] w-[350px]  bg-white"
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
                className="rounded-sm p-[3px] w-[350px]  bg-white"
              />
            </div>
            <div className=" flex flex-col items-center justify-center mt-[10px] ">
              <input
                type="button"
                value="LogIn"
                className=" rounded-2xl bg-black text-white pt-[5px] pb-[5px] pl-[20px] pr-[20px] w-[100px] mb-[15px] hover:cursor-pointer "
              />
              <p>
                Did not have Account? | <Link to="/signup">SignUp</Link>
              </p>
            </div>
          </form>
        </div>
        <div>
          <img src="/login.png" alt="" width={600} />
        </div>
      </div>
    </div>
  );
}

export default Login;
