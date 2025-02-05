import { useSetRecoilState } from "recoil";
import { AppBar } from "../components/AppBar";
import { useLognedInUserData } from "../hooks/getLoginedUser";
import { AppBarSkeleton } from "../skeleton/AppBarSkeleton";
import { blogContent, blogTitle, isPublished } from "../store/atom/atom";
import { useEffect } from "react";

export const WriteBlog = () => {
  const { initialLetters, loading } = useLognedInUserData();
  const setIsPublish = useSetRecoilState(isPublished);
  const setTitle=useSetRecoilState(blogTitle);
  const setContent=useSetRecoilState(blogContent);

  useEffect(() => {
    setIsPublish(true);
  }, []);

  if (loading) {
    return <AppBarSkeleton />;
  }
  return (
    <div>
      <AppBar initialLetter={initialLetters} />
      <div className="flex justify-center ">
        <div className="w-[50%] px-[2rem] py-[1rem] flex flex-col gap-[1rem]">
          <input
            type="email"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-[20px] text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none h-[50px]"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <textarea
            id="message"
            rows={4}
            cols={1}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300   outline-none"
            placeholder="Tell your Story..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
