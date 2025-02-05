import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface Blogs {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
  createdAt:string
}

export const useBlogs = () => {


  const [loading, setLoading] = useState(true);
  const [blog, setBlogs] = useState<Blogs[]>([]);
  const navigate = useNavigate();

  async function getBlogs() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("mediumToken")}`,
        },
      });
      const blogs = response.data;
      setBlogs(blogs);
      setLoading(false);
      return blogs;
    } catch (err) {
      navigate("/");
      return;
    }
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return {
    loading,
    blog,
  };
};
