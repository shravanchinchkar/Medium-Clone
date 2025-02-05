import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { getInitialLetters } from "../utils/getinitialLetters";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

interface BlogCardProps {
  id:string,
  authorName: string;
  createdAt: string;
  title: string;
  content: string;
}
export const BlogCard = ({
  id,
  authorName,
  createdAt,
  title,
  content,
}: BlogCardProps) => {
  const [initialLetters, setinitialLetters] = useState("");
  const [date,setDate]=useState("");

  useEffect(() => {
    const response = getInitialLetters(authorName);
    setinitialLetters(response);
    const formatedDate=formatDate(createdAt);
    setDate(formatedDate);
  }, []);

  return (
    <Link to={`/blog/${id}`}>
      <div className="m-[2rem] cursor-pointer flex flex-col gap-[0.5rem] bg-[#331922] shadow-lg p-[1rem] rounded-md">
        {/* Following is the author name and publish-date of the blog */}
        <div className="flex items-center gap-[0.5rem]">
          <Avatar initialLetter={initialLetters} />
          <div className="text-[#E6E6FA] font-semibold">{authorName}.</div>
          {/* <div className="bg-gray-400 w-[3.5px] h-[3.5px] rounded-[50%]">&#9679;</div> */}
          <div className="text-[#FFB6C1] text-[10px]">&#9679;</div>
          <div className="text-[#E6E6FA]">{date}</div>
        </div>

        {/* Following is the title and content */}
        <div className="w-[65%]">
          {/* Title of the blog */}
          <div className="text-3xl font-bold text-[#EDDEC9]">{title}</div>
          <div className="text-2xl font-semibold text-[#FFB6C1]">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
          </div>
          <div className="text-[#E6E6FA]">{`${Math.ceil(
            content.length / 100
          )} minutes read`}</div>
        </div>
      </div>
    </Link>
  );
};
