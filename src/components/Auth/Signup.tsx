import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
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
      toast.error("Registration failed");
    }
  };

  return (
    <div className="p-4 w-[70%] mx-auto">
      <h2 className="text-4xl mb-6">Signup</h2>
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
