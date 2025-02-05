import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { getInitialLetters } from "../utils/getinitialLetters";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id:string,
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
}
export const BlogCard = ({
  id,
  authorName,
  publishedDate,
  title,
  content,
}: BlogCardProps) => {
  const [initialLetters, setinitialLetters] = useState("");

  useEffect(() => {
    console.log("Author initial effect called");
    const response = getInitialLetters(authorName);
    setinitialLetters(response);
  }, []);

  return (
    <Link to={`/blog/${id}`}>
      <div className="m-[2rem] cursor-pointer flex flex-col gap-[0.5rem] border-gray-500 border-b-[1px] pb-[1rem]">
        {/* Following is the author name and publish-date of the blog */}
        <div className="flex items-center gap-[0.5rem]">
          <Avatar initialLetter={initialLetters} />
          <div className="text-[#0033C2] font-semibold">{authorName}.</div>
          {/* <div className="bg-gray-400 w-[3.5px] h-[3.5px] rounded-[50%]">&#9679;</div> */}
          <div className="text-gray-500 text-[10px]">&#9679;</div>
          <div>{publishedDate}</div>
        </div>

        {/* Following is the title and content */}
        <div className="w-[65%]">
          {/* Title of the blog */}
          <div className="text-3xl font-bold text-[#331922]">{title}</div>
          <div className="text-2xl font-semibold text-[#0033C2]">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
          </div>
          <div className="text-black">{`${Math.ceil(
            content.length / 100
          )} minutes read`}</div>
        </div>
      </div>
    </Link>
  );
};
