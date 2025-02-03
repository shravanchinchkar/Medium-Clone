import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/blog/:id" element={<Blog/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
