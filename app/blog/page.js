"use client"; // Required for client-side interactivity

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addPost = async () => {
    try {
      await addDoc(collection(db, "posts"), { title, postContent });
      setTitle("");
      fetchPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-4 border-2 p-5 rounded-xl shadow-lg shadow-blue-200 p-10 w-1/2 justify-self-center">
      <h1>Blog</h1>
      <input
        className="w-full border-2 border-blue-100 rounded-l px-2"
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border-2 border-blue-100 rounded-l px-2"
        name="postContent"
        placeholder="Post Content"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-200 hover:bg-blue-500 hover:text-white rounded-lg p-2 w-1/2 place-self-center"
        onClick={addPost}
      >
        Add Post
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
