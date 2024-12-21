import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const Home = () => {
  const navigate = useNavigate();

  // Based on session id
  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/check-session",
  //         { withCredentials: true }
  //       );
  //       if (response.status === 200 && response.data.isLoggedIn) {
  //       } else {
  //         navigate("/login");
  //         // setTimeout(() => { toast.error('Session not found Login again')},2000); not working currently
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       navigate("/login");
  //     }
  //   };
  //   checkSession();
  // }, [navigate]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return navigate("login");
        }

        // const response = await axios.post('http://localhost:3000/check-token', {
        //   headers: {
        //     Authorization: token,
        //   }
        // });

        // if (response.status === 201 && response.data.isLoggedIn) {
        //   // User is authenticated, you can proceed as usual
        // } else {
        //   navigate("/login");
        // }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        sessionStorage.clear();
        localStorage.clear();
        toast.success("Logout successfull");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  // const user = sessionStorage.getItem("email");

  return (
    <div>
      {/* <p className="text-white">welcome {user} </p>
      <button className="bg-white text-black" onClick={handleLogout}>
        Logout
      </button> */}

      <Navbar />
    </div>
  );
};

export default Home;
