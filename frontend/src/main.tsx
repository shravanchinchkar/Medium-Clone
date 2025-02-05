import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
    <ToastContainer />
  </RecoilRoot>
);
