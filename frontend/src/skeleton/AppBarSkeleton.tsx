

export const AppBarSkeleton = () => {
  return (
    <div className="sticky z-10 top-0 flex justify-between items-center text-[#EDDEC9] bg-[#331922] py-[1rem] border-b-[2px] animate-pulse">
      <div className="ml-[2.5rem] h-6 w-[150px] bg-[#EDDEC9] rounded"></div>

      <div className="flex w-[290px] justify-between items-center px-[2rem]">
        <div className="h-[40px] w-[80px] bg-[#EDDEC9] rounded-lg"></div>

        <div className="h-10 w-10 bg-[#EDDEC9] rounded-full"></div>

        {/* Skeleton for the logout button (hidden by default in the skeleton) */}
        <div className="hidden">
          <div className="h-[50px] w-[150px] bg-[#EDDEC9] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
