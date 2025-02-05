import axios from "axios";
import { useState } from "react";
import {toast} from "react-toastify"
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { Quote } from "../components/Quote";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "../components/AuthButton";
import { AuthHeader } from "../components/AuthHeader";
import { LabeledInput } from "../components/LabeledInput";
import { SigninInputs } from "@shravanchinchkar/medium-common";
import { SubmittingButton } from "../components/SubmittingButton";
import { isAuthenticated, isSubmitting } from "../store/atom/atom";

export const Signin = () => {
  const [signinInputs, setsigninInputs] = useState<SigninInputs>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useRecoilState(isAuthenticated);
  const [isSubmit,setIsSubmit]=useRecoilState(isSubmitting);


  async function signin() {
    try {
      setIsSubmit(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinInputs
      );
      setIsSubmit(false);
      const jwt = response.data;
      localStorage.setItem("mediumToken", jwt.token);
      setIsAuth(localStorage.getItem("mediumToken"));
      console.log("isAut form Signin component!", isAuth);
      navigate("/blogs");
      toast("Login Successful",{position:"bottom-right",type:"success",theme:"light",autoClose:2000})
    } catch (err) {
      setIsSubmit(false);
      console.log(err);
      toast.error("Invalid Credentials!",{position:"bottom-right",type:"error",theme:"light",autoClose:2000});
    }
  }
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="h-screen flex justify-center items-center">
        <div className="w-[60%] h-[65%] flex flex-col gap-[2rem]">
          {/* Following div consist of Title and Subtitle */}
          <AuthHeader
            title="Login to account"
            subtitle="Don't have an account?"
            to="/signup"
            buttonName="Signup"
          />
          {/* Following div consist of Input Box */}
          <LabeledInput
            label={"Email"}
            placeholder={"m@gmail.com"}
            onChange={(e) => {
              setsigninInputs({
                ...signinInputs,
                email: e.target.value,
              });
            }}
          />

          <LabeledInput
            label={"Password"}
            placeholder={""}
            onChange={(e) => {
              setsigninInputs({
                ...signinInputs,
                password: e.target.value,
              });
            }}
            inputType={"password"}
          />
          {isSubmit===false?<AuthButton buttonName={"Signin"} onClick={signin} />:null}
          {isSubmit?<SubmittingButton/>:null}
        </div>
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
};
