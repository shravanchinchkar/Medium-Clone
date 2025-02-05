import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "../components/AuthButton";
import { AuthHeader } from "../components/AuthHeader";
import { LabeledInput } from "../components/LabeledInput";
import { SignupInput } from "@shravanchinchkar/medium-common";
import { useRecoilState } from "recoil";
import { isSubmitting } from "../store/atom/atom";
import { SubmittingButton } from "../components/SubmittingButton";

export const Signup = () => {
  const [signupInputs, setsignupInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });
  const navigate=useNavigate();
  const [isSubmit,setIsSubmit]=useRecoilState(isSubmitting);

  async function signup() {
    try{
      setIsSubmit(true);
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`,signupInputs);
      navigate("/signin");
      setIsSubmit(false);
    }catch(err){
      setIsSubmit(false);
      alert("Signup Fail!")
    }
  }
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="h-screen flex justify-center items-center">
        <div className="w-[60%] h-[65%] flex flex-col gap-[2rem]">
          {/* Following div consist of Title and Subtitle */}
          <AuthHeader
            title="Create an account"
            subtitle="Already have an accont?"
            to="/signin"
            buttonName="Signin"
          />
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
          {isSubmit===false?<AuthButton buttonName={"Signup"} onClick={signup}/>:null}
          {isSubmit?<SubmittingButton/>:null}
        </div>
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
};