// Import necessary libraries
import React, { useState, useEffect } from "react";
import { ProfileCircle } from "iconoir-react";
import { useUser } from "../context/ProvideUser";
import { Button, Group } from "@mantine/core";
import axios from "axios";

// Define the Blogs component
export default function Blogs() {
  // State variables to manage posts, loading state, and errors
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the username from the user context
  const { username } = useUser();

  // Function to fetch posts from the backend
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

  // useEffect hook to fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to delete a post
  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}blogs/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        // If deletion successful, fetch posts again to reflect changes
        setPosts(posts.filter((post) => post._id !== id));

        alert("Deleted Successfully");
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // JSX to render the component
  return (
    <div>
      {/* Conditionally render based on loading, error, and post data */}
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : posts.length > 0 ? (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Render posts */}
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
                      {post.user_info.username === username ? (
                        <b>
                          You
                          {
                            <Group justify="center">
                              {/* Button to delete post */}
                              <Button
                                variant="filled"
                                color="red"
                                radius="xl"
                                onClick={() => deletePost(post._id)}
                              >
                                Delete
                              </Button>
                              {/* Button for update */}
                              <Button
                                variant="filled"
                                color="green"
                                radius="xl"
                              >
                                update
                              </Button>
                            </Group>
                          }
                        </b>
                      ) : (
                        post.user_info.username
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
