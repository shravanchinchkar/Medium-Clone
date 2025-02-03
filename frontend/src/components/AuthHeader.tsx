import { Link } from "react-router-dom";

interface authHeaderProps{
    title:string;
    subtitle:string;
    to:string;
    buttonName:string
}

export const AuthHeader = ({title,subtitle,to,buttonName}:authHeaderProps) => {
  return (
    <>
      {/* Following div consist of Title and Subtitle */}
      <div className="flex flex-col gap-[0.5rem] ">
        {/* Following is the title of the card */}
        <div className="text-center  font-bold text-3xl">
          {title}
        </div>
        {/* Following is the subtitle of the card */}
        <div className="flex justify-center gap-[0.3rem]">
          <div className="text-center font-semibold text-gray-400">
            {subtitle}
          </div>
          <Link
            className="underline text-gray-400 font-semibold"
            to={to}
          >
            {buttonName}
          </Link>
        </div>
      </div>
    </>
  );
};
