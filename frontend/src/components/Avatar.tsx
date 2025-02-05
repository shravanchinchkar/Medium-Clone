

export const Avatar = ({initialLetter}:{initialLetter:string}) => {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#EDDEC9]  rounded-full">
      <span className="font-medium text-[#331922]">{initialLetter}</span>
    </div>
  );
};
