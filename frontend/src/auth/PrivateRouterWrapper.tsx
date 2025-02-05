import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../store/atom/atom";
import { Navigate, useLocation} from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteWrapperProps {
  children: ReactNode;
}

export const PrivateRouteWrapper = ({ children }: PrivateRouteWrapperProps) => {
  console.log("Private Router Called!");
  const isAuth = useRecoilValue(isAuthenticated);
  const { pathname } = useLocation();

  if (isAuth === null) {
    if (pathname === "/blogs") {
      return <Navigate to={"/"} />;
    }
    return children;
  } else if (isAuth) {
    if (pathname === "/signin" || pathname === "/signup" ||  pathname === "/") {
      return <Navigate to={"/blogs"} />;
    }
    return children;
  }
};
