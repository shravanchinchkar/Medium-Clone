import { useState } from "react";
import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticated, isPublished } from "../store/atom/atom";
import { Link } from "react-router-dom";
import { WriteBlogButton } from "./WriteBlogButton";
import { PublishBlogButton } from "./PublishBlogButton";
import {toast} from "react-toastify"
 
export const AppBar = ({ initialLetter }: { initialLetter: string }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const setIsAuth = useSetRecoilState(isAuthenticated);
  const isPublish=useRecoilValue(isPublished);

  function displayLogOut() {
    if (!display) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }
  function logOut() {
    localStorage.removeItem("mediumToken");
    const token = localStorage.getItem("mediumToken");
    setIsAuth(token);
    setDisplay(false);
    navigate("/");
    toast("Signout Successful",{position:"bottom-right",type:"success",theme:"light",autoClose:2000})
    
  }

  return (
    <div className="sticky z-10 top-0 flex justify-between items-center text-[#EDDEC9] bg-[#331922]  py-[1rem] border-b-[2px]">
      <Link to={"/blogs"}>
        <div className="text-2xl font-bold ml-[2.5rem] cursor-pointer">
          Medium-Clone
        </div>
      </Link>

      <div className="flex w-[290px] justify-between items-center px-[2rem]">

        {/* Following is div consist of write and Publish Button */}
       {!isPublish?<Link to={"/new-story"}>
          <WriteBlogButton/>
        </Link>:null}

       {isPublish?<PublishBlogButton/>:null}

        <button className="relative cursor-pointer" onClick={displayLogOut}>
          <Avatar initialLetter={initialLetter} />
        </button>

        {/* Following is the logout button */}
        <button
          className={
            display
              ? "cursor-pointer w-[150px] h-[50px] z-10 flex justify-center items-center absolute top-[75px] right-[5px] bg-[#331922] gap-[0.5rem] rounded-md"
              : "hidden"
          }
          onClick={logOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 text-white fill-none"
          >
            <path
              d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
              className="stroke-current stroke-1.5"
              strokeLinecap="round"
            />
            <path
              d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
              className="stroke-current stroke-1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="text-xl font-semibold">Sign Out</div>
        </button>
      </div>
    </div>
  );
};
