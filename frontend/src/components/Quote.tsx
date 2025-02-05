export const Quote = () => {
  return (
    <div className="h-screen bg-[#331922] text-[#EDDEC9] flex justify-center items-center">
      <div className="w-[65%] flex flex-col gap-[0.5rem]">
        <div className="w-[100%] text-2xl font-bold flex justify-center">
          "The Customer Service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="flex flex-col gap-0">
          <div className="font-semibold text-[18px]">Jules Winnfield</div>
          <div className="font-semibold text-white">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
};
