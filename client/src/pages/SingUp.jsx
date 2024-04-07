import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const register = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );
      if (response.ok) {
        setRedirect(true);
        console.log("Registration successful");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (redirect) {
      setTimeout(() => navigate("/login"), 1000);
    }
  }, [redirect]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <form noValidate className="space-y-6" onSubmit={register}>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            required
            value={userInfo.username}
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />

          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}
            aria-required
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
