import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import Spinner from "../common/Spinner";

interface GoogleDecodedCredential {
  email: string;
  name: string;
  sub: string;
  picture: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/");
          toast.success("Login Successfull");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Could not log in");
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleDecodedCredential>(credentialResponse.credential);

      const response = await axios.post("http://localhost:3000/auth/google", {
        email: decoded.email,
        name: decoded.name,
        googleId: decoded.sub,
        picture: decoded.picture,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response?.data?.token);
        navigate("/");
        toast.success("Google Login Successful");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed");
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
          {isLoading ? <Spinner /> : "Login"}
        </button>
      </form>

      <div className="flex flex-col items-center mt-4">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleError}
          useOneTap
        />
      </div>

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
