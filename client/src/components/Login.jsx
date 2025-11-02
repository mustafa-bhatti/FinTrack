import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import loginImg from '../assets/landingPage/signup.png';
import Footer from './Footer';
import { AuthContext } from '../context/auth';
function Login() {
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();
    setLoading(true);
    setError('');
    // Validation
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

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
              onSubmit={handleSubmit}
              className="flex flex-col gap-[15px]  pt-[40px] pb-[40px] pl-[30px] pr-[30px] border-3 rounded-md border-green-100 hover:border-green-200 max-md:mt-[40px] max-md:mb-[40px] max-md:border-green-200 md:p-[15px]"
            >
              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
                  {error}
                </div>
              )}
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
                  className="rounded-sm  pt-[4px] pb-[4px] pl-[3px] pr-[3px] w-[350px]  bg-white max-md:w-auto"
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
                  minLength={6}
                  placeholder="password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                  className="rounded-sm  pt-[4px] pb-[4px] pl-[3px] pr-[3px] w-[350px]  bg-white max-md:w-auto"
                />
              </div>
              <div className=" flex flex-col items-center justify-center mt-[10px] ">
                <button
                  type="submit"
                  value="LogIn"
                  disabled={loading}
                  className=" rounded-2xl bg-black text-white pt-[5px] pb-[5px] pl-[20px] pr-[20px]  mb-[15px] hover:cursor-pointer "
                >
                  {loading ? 'Logging In...' : 'LogIn'}
                </button>
                <p>
                  Did not have Account? |{' '}
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
