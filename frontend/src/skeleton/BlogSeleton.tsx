
export const BlogSkeleton = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="sticky z-10 top-0 flex justify-between items-center bg-gray-300 py-[1rem]  animate-pulse">
        <div className="h-6 w-32 bg-gray-400 rounded ml-[2.5rem]"></div>
        <div className="h-10 w-10 bg-gray-400 rounded-full mr-[2.5rem]"></div>
      </div>

      <div className="flex justify-between">
        {/* Left Section Skeleton */}
        <div className="flex flex-col gap-[1rem] w-[70%] pl-[2rem] pt-[2rem] pb-[2rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <div className="h-8 w-3/4 bg-gray-400 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
          </div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>

        {/* Right Section Skeleton */}
        <div className="flex flex-col gap-[0.7rem] w-[30%] pt-[2rem] px-[2rem]">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="flex gap-[1rem] min-h-[100px]">
            <div className="h-16 w-16 bg-gray-400 rounded-full"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
