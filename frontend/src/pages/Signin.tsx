import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "../components/AuthButton";
import { AuthHeader } from "../components/AuthHeader";
import { LabeledInput } from "../components/LabeledInput";
import { SigninInputs } from "@shravanchinchkar/medium-common";

export const Signin = () => {
  const [signinInputs, setsigninInputs] = useState<SigninInputs>({
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  async function signin() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,signinInputs);
      const jwt = response.data;
      localStorage.setItem("mediumToken", jwt.token);
      navigate("/blogs");
    } catch (err) {}
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
          <AuthButton buttonName={"Signin"} onClick={signin} />
        </div>
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
};
