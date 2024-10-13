import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() =>{
   const checkSession = async() =>{
    try{
      const response = await axios.get('http://localhost:3000/check-session', {withCredentials: true});
      if(response.status === 200 && response.data.isLoggedIn){

      }
      else{
        toast.error('Session expired login again')
        navigate('/login');
      }
    }catch(error){
      console.error(error);
      navigate("/login");
    }
   }
   checkSession()
  },[navigate])

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        sessionStorage.clear();
        toast.success("Logout successfull");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  const user = sessionStorage.getItem("email");

  return (
    <div>
      <p className="text-white">welcome {user} </p>
      <button className="bg-white text-black" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
