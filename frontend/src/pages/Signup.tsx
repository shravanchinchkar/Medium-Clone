import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="h-screen flex justify-center items-center">
        <Auth type={"Signup"}/>
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};
