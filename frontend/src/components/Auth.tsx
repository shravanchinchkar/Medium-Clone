import { Link } from "react-router-dom";
import { LabeledInput } from "./LabeledInput";
import { SignupInput } from "@shravanchinchkar/medium-common";
import { useState } from "react";

export const Auth = ({type}:{type:"Signup"|"Signin"}) => {
  const [signupInputs, setsignupInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });

  return (
    <div className="w-[60%] h-[65%] flex flex-col gap-[2rem]">
      {/* Following div consist of Title and Subtitle */}
      <div className="flex flex-col gap-[0.5rem] ">
        {/* Following is the title of the card */}
        <div className="text-center  font-bold text-3xl">Create an account</div>
        {/* Following is the subtitle of the card */}
        <div className="flex justify-center gap-[0.3rem]">
          <div className="text-center font-semibold text-gray-400">
            Already have an account?
          </div>
          <Link
            className="underline text-gray-400 font-semibold"
            to={"/signin"}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Following div consist of Input Box */}
      <LabeledInput
        label={"Email"}
        placeholder={"m@gmail.com"}
        onChange={(e) => {
          setsignupInputs({
            ...signupInputs,
            email: e.target.value,
          });
        }}
      />

      <LabeledInput
        label={"Name"}
        placeholder={"Jhon Doe"}
        onChange={(e) => {
          setsignupInputs({
            ...signupInputs,
            name: e.target.value,
          });
        }}
      />

      <LabeledInput
        label={"Password"}
        placeholder={""}
        onChange={(e) => {
          setsignupInputs({
            ...signupInputs,
            password: e.target.value,
          });
        }}
        inputType={"password"}
      />
    </div>
  );
};
