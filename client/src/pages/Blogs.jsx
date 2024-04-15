import React, { useState, useEffect } from "react";
import { ProfileCircle } from "iconoir-react";
import { useUser } from "../context/ProvideUser";
import { Button, Group, TextInput } from "@mantine/core"; // Assuming you have TextInput component
import axios from "axios";

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

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}blogs/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== id));
        alert("Deleted Successfully");
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updatePost = async (id, updatedTitle, updatedContent) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}blogs/${id}`,
        { title: updatedTitle, content: updatedContent },
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchPosts(); // Fetch posts again to reflect changes
        alert("Updated Successfully");
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : posts.length > 0 ? (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
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
                  {post.user_info.username === username ? (
                    <TextInput
                      value={post.title}
                      onChange={(e) => {
                        const updatedPosts = [...posts];
                        updatedPosts[i].title = e.target.value;
                        setPosts(updatedPosts);
                      }}
                      disabled={!post.editing} // Disable input if not in edit mode
                    />
                  ) : (
                    <h3 className="text-xl font-semibold text-gray-800">
                      {post.title}
                    </h3>
                  )}
                  {post.user_info.username === username ? (
                    <TextInput
                      value={post.content}
                      onChange={(e) => {
                        const updatedPosts = [...posts];
                        updatedPosts[i].content = e.target.value;
                        setPosts(updatedPosts);
                      }}
                      className={
                        post.user_info.username === username ? "text-bold" : ""
                      } // Add class to make text bold for author's posts
                      disabled={!post.editing} // Disable input if not in edit mode
                    />
                  ) : (
                    <p className="mt-5 text-gray-600">{post.content}</p>
                  )}
                </div>
                <div className="mt-auto flex items-center gap-x-3">
                  <ProfileCircle height={30} width={28} />
                  <div>
                    <h5 className="text-sm text-gray-800">
                      By
                      {post.user_info.username === username ? (
                        <b>
                          You
                          <Group justify="center">
                            <Button
                              variant="filled"
                              color="red"
                              radius="xl"
                              onClick={() => deletePost(post._id)}
                            >
                              Delete
                            </Button>
                            {post.editing ? (
                              // If in edit mode, show Save button
                              <Button
                                variant="filled"
                                color="green"
                                radius="xl"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to update?"
                                    )
                                  ) {
                                    updatePost(
                                      post._id,
                                      post.title,
                                      post.content
                                    );
                                  }
                                }}
                              >
                                Save
                              </Button>
                            ) : (
                              // Otherwise, show Update button
                              <Button
                                variant="filled"
                                color="blue"
                                radius="xl"
                                onClick={() => {
                                  const updatedPosts = [...posts];
                                  updatedPosts[i].editing = true;
                                  setPosts(updatedPosts);
                                }}
                              >
                                Update
                              </Button>
                            )}
                          </Group>
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
