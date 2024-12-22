"use client"; // Required for client-side interactivity

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addPost = async () => {
    if (author) {
      try {
        await addDoc(collection(db, "posts"), { title, content, author });
        setTitle("");
        setContent("");
        fetchPosts();
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please log in to add a post.");
    }
  };

  const handlePostPage = (postID) => {
    console.log(postID);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const value = localStorage.getItem("bloggerEmail");
    if (value) {
      setAuthor(value);
    }
  }, []);

  return (
    <div>
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
          className="w-full border-2 border-blue-100 h-1/2 rounded-l px-2"
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-200 hover:bg-blue-500 hover:text-white rounded-lg p-2 w-1/2 place-self-center"
          onClick={addPost}
        >
          Add Post
        </button>
      </div>
      <div className="flex flex-col gap-4 border-2 p-5 mt-20 rounded-xl shadow-lg shadow-blue-200 p-10 w-full justify-self-center">
        <div className="grid grid-cols-3 gap-3">
          {posts.map((post) => (
            <div
              className="border-2 border-yellow-200 rounded-lg px-2 py-1"
              key={post.id}
            >
              <div
                className="text-center bg-green-100 rounded-lg"
                id="postTitle"
              >
                {post.title}
              </div>
              <div className="h-32 overflow-clip" id="postContent">
                {post.content}
              </div>

              <Link
                href={`/blog/${post.id}`}
                className="text-sm text-left bg-blue-100 w-1/2 p-1 rounded-lg hover:text-white hover:bg-blue-400 hover:pointer text-blue-700"
              >
                Read more..
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
