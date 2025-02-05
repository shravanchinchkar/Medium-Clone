export const BlogsSkeleton = () => {
  return (
    <div className="">
      {/* Skeleton Header */}
      <div className="flex justify-between items-center text-[#EDDEC9] bg-gray-600 py-[1rem] border-b-[2px]">
        <div className="text-2xl font-bold ml-[1rem] bg-gray-300 w-36 h-8 rounded animate-pulse"></div>
        <div className="cursor-pointer mr-[1rem]">
          <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Skeleton Blog */}
      <div className="m-[2rem] flex flex-col gap-[0.5rem] border-gray-500 border-b-[1px] pb-[1rem]">
        {/* Skeleton Author Section */}
        <div className="flex items-center gap-[0.5rem]">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="bg-gray-300 w-24 h-6 rounded animate-pulse"></div>
          <div className="bg-gray-300 w-2 h-2 rounded-full animate-pulse"></div>
          <div className="bg-gray-300 w-20 h-4 rounded animate-pulse"></div>
        </div>

        {/* Skeleton Title and Content */}
        <div className="w-[65%] flex flex-col gap-2">
          <div className="bg-gray-300 w-full h-8 rounded animate-pulse"></div>
          <div className="bg-gray-300 w-full h-6 rounded animate-pulse"></div>
          <div className="bg-gray-300 w-32 h-4 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
