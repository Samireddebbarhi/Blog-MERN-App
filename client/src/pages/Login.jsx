import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authentication } from "../context/Provider";
import { useUser } from "../context/ProvideUser";
import axios from "axios";
export default function Login() {
  const access = useContext(authentication);
  const { setUsername } = useUser();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}login`,
        user, // Passing user directly as data
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setRedirect(true);
        setUsername(user.username);
        access.logged();
        alert("You are logged in Successfully");
      } else {
        throw new Error("Invalid Username or Password");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (redirect) navigate("/blogs");
  }, [redirect]);
  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Login</h1>
        <p className="text-sm dark:text-gray-600">
          Sign in to access your account
        </p>
      </div>
      <form noValidate action="" className="space-y-6" onSubmit={HandleLogin}>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="text"
              name="username"
              id="email"
              placeholder="Your username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline dark:text-gray-600"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              value={user.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Sign in
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Don't have an account yet?
            <Link to="/signup" className="text-l text-[blue]">
              SignUp
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
