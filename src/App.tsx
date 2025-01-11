import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./components/Home/Home";
import "./index.css";
import LoginPage from "./pages/Login/index";
import SignupPage from "./pages/Signup/index";
import GoogleProvider from "./providers/GoogleAuthProvider";

const App = () => (
  <GoogleProvider>
    <Router>
      <ToastContainer />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  </GoogleProvider>
);

export default App;
