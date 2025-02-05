import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { blogContent, blogTitle, isPublished } from "../store/atom/atom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const PublishBlogButton = () => {
  const setIsPublish = useSetRecoilState(isPublished);
  const [title, setTitle] = useRecoilState(blogTitle);
  const [content, setContent] = useRecoilState(blogContent);
  const [isPublishing, setIsPublishing] = useState(false);

  const navigate = useNavigate();

  console.log("Title is:", title);
  console.log("Content is:", content);

  async function sendBlog() {
    try {
      setIsPublishing(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("mediumToken")}`,
          },
        }
      );
      console.log("response is:-", response);
      setIsPublish(false);
      setIsPublishing(false);
      navigate(`/blog/${response.data.blog.id}`);
    } catch (err) {
      alert("Can't Publish the blog :( please try again!");
      navigate("/new-story");
      setTitle("");
      setContent("");
      setIsPublishing(false);
    }
  }
  return (
    <>
      <button
        type="button"
        className={!isPublishing?"focus:outline-none text-[#331922] bg-[#EDDEC9] hover:bg-[#D4C3B1] cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5":"focus:outline-none text-[#331922] bg-[#EDDEC9] hover:bg-[#D4C3B1] font-medium rounded-lg text-sm px-5 py-2.5"}
        onClick={sendBlog}
        disabled={isPublishing}
      >
        {isPublishing ? (
        <svg
          className="animate-spin h-5 w-5 text-[#331922]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
          ></path>
        </svg>
      ) : (
        'Publish'
      )}
      </button>
    </>
  );
};
