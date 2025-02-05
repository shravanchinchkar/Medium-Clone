
interface AuthButton{
    buttonName:string,
    onClick:()=>void
}
export const AuthButton = ({buttonName,onClick}:AuthButton) => {
  return (
    <>
      <button
        type="button"
        className="text-white cursor-pointer bg-[#331922] hover:bg-[#664455]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={onClick}
      >
        {buttonName}
      </button>
    </>
  );
};
