import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 201) {
        toast.success("Login Successfull");
        sessionStorage.setItem('email', email);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not Logged in");
    }
  };

  return (
    <div className="p-4 w-[70%] mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-4xl text-[#7E60BF]">Login</h2>
        <img src={logo} alt="logo" width={70} className="rounded-full" />
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border-2 p-2 mb-2 outline-[#81DAE3] rounded-md "
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border-2 p-2 mb-2 outline-[#81DAE3] rounded-md "
        />
        <button
          type="submit"
          className="bg-[#433878] hover:bg-[#7E60BF] duration-300 ease-in-out text-white hover:text-[#0B192C] p-2 w-[40%] m-auto rounded-full"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-6">
        Don't have an account?
        <Link to="/signup">
          {" "}
          <span className="text-[#605678] underline">Signup</span>{" "}
        </Link>
      </p>
    </div>
  );
};

export default Login;
