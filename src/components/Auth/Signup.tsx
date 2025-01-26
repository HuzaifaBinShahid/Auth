import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import "../../index.css";
import Spinner from "../commonComponents/Spinner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        username,
        password,
        email,
      });
      if (response.status === 201) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      toast.error("Registration failed");
    }
  };

  return (
    <div className="p-4 w-[70%] mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-4xl text-[#7E60BF]">Signup</h2>
        <img src={logo} alt="logo" width={70} className="rounded-full" />
      </div>
      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          required
          className="border-2 p-2 mb-2 outline-[#81DAE3] rounded-md "
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="border-2 p-2 mb-2 outline-[#81DAE3] rounded-md "
        />
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
          {isLoading ? <Spinner /> : "Signup"}
        </button>
      </form>

      <p className="text-center mt-6">
        Already has an account?{" "}
        <Link to="/login">
          {" "}
          <span className="text-[#605678] underline">Login</span>{" "}
        </Link>
      </p>
    </div>
  );
};

export default Signup;
