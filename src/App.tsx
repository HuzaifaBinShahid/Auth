import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignupPage from "./pages/Signup/index";
import LoginPage from "./pages/Login/index";
import "./index.css";
import "./App.css";

const App = () => (
  <Router>
    <ToastContainer />
    <div>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
