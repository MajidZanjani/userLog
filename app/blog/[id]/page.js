"use client"; // Required for client-side interactivity

import { useState, useEffect, use } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function PostPage({ params }) {
  const { id } = use(params); // `id` comes from the dynamic route
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, "posts", id));
      if (postDoc.exists()) {
        setPost({ id: postDoc.id, ...postDoc.data() });
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-col gap-4 border-2 p-5 mt-20 rounded-xl shadow-lg shadow-blue-200 p-10 w-full">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-lg">{post.content}</p>
      <div className="text-sm text-left flex gap-1">
        <h1 className="text-purple-600">Author: </h1>
        <h1 className="text-purple-400">{post.author}</h1>
      </div>
      <Link
        href={`/blog`}
        className="text-sm text-center w-full bg-green-100 w-1/6 p-1 rounded-lg hover:text-white hover:bg-green-400 hover:pointer text-green-700 border-green-400 border-2"
      >
        Back to Blog
      </Link>
    </div>
  );
}
