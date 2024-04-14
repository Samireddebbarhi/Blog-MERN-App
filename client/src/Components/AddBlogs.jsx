import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddBlogs() {
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}blogs`,
        blog,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        setRedirect(true);
        alert("Blog added successfully");
        // navigate("/blogs");
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    if (redirect) navigate("/blogs");
  }, [redirect]);

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Create your Blog</h1>
        </div>

        <div className="mt-5">
          <form onSubmit={handleAdd}>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm mb-2">
                  Title Blog
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                    className="py-3 px-4 w-full border-black-200 rounded-lg text-sm focus:border-black-500 focus:ring-black-500 outline-none"
                    required
                  />
                  {/* You can add error message here if needed */}
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm mb-2">
                  Content
                </label>
                <div className="relative">
                  <textarea
                    id="content"
                    name="content"
                    rows="3"
                    value={blog.content}
                    onChange={handleChange}
                    className="py-3 px-4 w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-none resize-none"
                    required
                  ></textarea>
                  {/* You can add error message here if needed */}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlogs;
