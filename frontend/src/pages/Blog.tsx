import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { useBlog } from "../hooks/getBlogHook";
import { AppBar } from "../components/AppBar";
import { BlogType } from "../hooks/getBlogHook";
import { BlogSkeleton } from "../skeleton/BlogSeleton";
import { useLognedInUserData } from "../hooks/getLoginedUser";
import { formatDate } from "../utils/formatDate";

// Todo: Implement atomFamilies/selectorFamilies
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog, authorName} = useBlog({
    id: id || "",
  }) as { loading: boolean; blog: BlogType; authorName: string;};
  const { initialLetters } = useLognedInUserData();
  const [date,setDate]=useState("");

  useEffect(() => {
    const formatedDate=formatDate(blog.createdAt);
    setDate(formatedDate)
  }, [blog]);

  if (loading) {
    return <BlogSkeleton />;
  }

  return (
    <div>
      <AppBar initialLetter={initialLetters} />
      <div className="flex justify-between">

        {/* Following is the left div */}
        <div className="flex flex-col gap-[1rem] w-[60%] ml-[5rem] mt-[2rem] mb-[2rem] border-[2px] bg-[#331922] rounded-md p-[1rem]">

          {/* Left top div */}
          <div className="flex flex-col gap-[0.5rem]">
            <div className="text-3xl font-bold text-[#EDDEC9]">{blog.title}</div>
            <div className="text-[#E6E6FA] font-semibold">
              Posted On <span>{date}</span>
            </div>
          </div>

          {/* Left bottom div */}
          <div className="text-[#FFB6C1] text-[20px] font-semibold items-center">
            {blog.content}
          </div>

        </div>

        {/* Following is the right div */}
        <div className=" flex flex-col gap-[0.7rem] w-[40%] pt-[2rem] px-[5rem]">
          {/* Right top div */}
          <div className="text-black font-semibold text-[17px]">Author</div>

          {/* Right Bottom div */}
          <div className="flex gap-[1rem]  min-h-[100px] max-h-max">
            <div className="flex items-center">
              <Avatar initialLetter={authorName} />
            </div>

            <div className="flex flex-col justify-center gap-[0.5rem]">
              <div className="text-2xl font-bold">{blog.author.name}</div>
              <div className="text-gray-500 font-semibold ">
                Hi!, my name is Shravan Ajit Chinchkar. I am a last year BE
                student from PDEA's College of Engineering Manjari(Bk.)Pune
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
