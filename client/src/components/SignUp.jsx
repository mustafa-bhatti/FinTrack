import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import signUpImg from "../assets/landingPage/signup.png";
import Footer from "./Footer";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import { useState } from "react";
function SignUp() {
  const authContext = useContext(AuthContext);
  const { register, isAdmin } = authContext;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };
  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();
    setLoading(true);
    setError("");
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      if (isAdmin) {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="bg-green-50 lg:h-full max-md:h-screen  md:h-screen max-lg:h-full">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt=""
            className="w-[125px] cursor-pointer pl-2.5 pb-2.5 pt-2.5"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center max-md:flex  max-lg:flex lg:flex lg:flex-row">
        <div className=" flex flex-col items-center justify-center m-auto gap-2.5">
          <h2 className="text-2xl text-[green] font-semibold">
            SignUp as User
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[15px]  pt-10 pb-10 pl-[30px] pr-[30px] border-3 rounded-md border-green-100 hover:border-green-200 max-md:mt-10 max-md:mb-10 max-md:border-green-200 md:p-[15px]"
          >
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <label htmlFor="name" className="text-left">
                User Name:
              </label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={handleChange}
                value={formData.name}
                placeholder="your name"
                className="rounded-sm  pt-1 pb-1 pl-[3px] pr-[3px] w-[350px]  bg-white max-md:w-auto "
              />
            </div>
            <div>
              <label htmlFor="email" className="text-left">
                Email:
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                required
                onChange={handleChange}
                value={formData.email}
                className="rounded-sm  pt-1 pl-[3px] pr-[3px] w-[350px]  bg-white max-md:w-auto"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-left">
                Password:
              </label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                minLength={7}
                placeholder="password"
                required
                onChange={handleChange}
                value={formData.password}
                className="rounded-sm  pt-1 pb-1 pl-[3px] pr-[3px] w-[350px]  bg-white max-md:w-auto"
              />
            </div>
            <div className=" flex flex-col items-center justify-center mt-2.5 ">
              <button
                type="submit"
                disabled={loading}
                className=" rounded-2xl bg-black text-white pt-[5px] pb-[5px] pl-5 pr-5 w-[100px] mb-[15px]  hover:cursor-pointer "
              >
                SignUp
              </button>
              <p>
                Already have Account? |{" "}
                <Link to="/LogIn" className="text-[green] font-semibold">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div>
          <img src={signUpImg} alt="" width={600} className="max-md:hidden " />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
