import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/sign-in-up/SignUp";
import SignIn from "./pages/sign-in-up/SignIn";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/sign-in-up/VerifyEmail";
function App() {
  return (
    <div>
      <Routes>
        {/* public route */}
        <Route path="/admin-sign-up" element={<SignUp />} />

        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* private */}
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
