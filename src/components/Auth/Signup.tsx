import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/Signup", {
        username,
        password,
        email,
      });
      if (response.status === 201) {
        alert("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="p-4 w-[70%] mx-auto">
      <h2 className="text-4xl mb-6">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col">
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
          className="border-2 p-2 mb-2 outline-none rounded-md "
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border-2 p-2 mb-2 outline-none rounded-md "
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-[50%] m-auto">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
