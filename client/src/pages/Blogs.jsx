import React, { useEffect, useState, useContext } from "react";
import { ProfileCircle } from "iconoir-react";
import { useUser } from "../context/ProvideUser";
import cookie from "js-cookie";
import { Button } from "@mantine/core";
export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useUser();
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}blogs`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : posts.length > 0 ? (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
              The Blogs
            </h2>
            <p className="mt-1 text-gray-600">
              See All the blogs from all the users .
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <div
                key={i}
                className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5"
              >
                <div className="aspect-w-16 aspect-h-11">
                  <img
                    className="w-full object-cover rounded-xl"
                    src="src/assets/images/image_ark.jpeg"
                    alt="Image "
                  />
                </div>
                <div className="my-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="mt-5 text-gray-600">{post.content}</p>
                </div>
                <div className="mt-auto flex items-center gap-x-3">
                  <ProfileCircle height={30} width={28} />
                  <div>
                    <h5 className="text-sm text-gray-800">
                      By
                      {post.user_info.username === username
                        ? <b> You </b> && (
                            <button
                              type="button"
                              class="py-3 px-4 inline-flex flex-end items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none hidden"
                            >
                              delete
                            </button>
                          )
                        : post.user_info.username}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              className="py-3 px-4 inline-flex items-center gap-x-1 text-sm font-medium rounded-full border border-gray-200 bg-white text-blue-600 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              href="/"
            >
              Read more
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
