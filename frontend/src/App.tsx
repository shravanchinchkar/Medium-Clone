import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRouteWrapper } from "./auth/PrivateRouterWrapper";
import { WriteBlog } from "./pages/WriteBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Following route is for / endpoint */}
          <Route
            path="/"
            element={
              <PrivateRouteWrapper>
                <Signin />
              </PrivateRouteWrapper>
            }
          />
          {/* Following route is for  /signup endpoint */}
          <Route
            path="/signup"
            element={
              <PrivateRouteWrapper>
                <Signup />
              </PrivateRouteWrapper>
            }
          />
          {/* Following route is for /signin endpoint */}
          <Route
            path="/signin"
            element={
              <PrivateRouteWrapper>
                <Signin />
              </PrivateRouteWrapper>
            }
          />
          {/* Following route is for /blogs end point */}
          <Route
            path="/blogs"
            element={
              <PrivateRouteWrapper>
                <Blogs />
              </PrivateRouteWrapper>
            }
          />
          {/* Following route is for fetching specific blog */}
          <Route
            path="/blog/:id"
            element={
              <PrivateRouteWrapper>
                <Blog />
              </PrivateRouteWrapper>
            }
          ></Route>
          <Route
            path="/writeblog"
            element={
              <PrivateRouteWrapper>
                <WriteBlog />
              </PrivateRouteWrapper>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
