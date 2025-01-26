import LoginImage from '../../assets/LoginImage.jpg'
import Login from "../../components/Auth/Login"

const LoginPage = () => {
  return (
    <div className=" grid grid-cols-2 justify-center items-center my-6 rounded-lg bg-white w-[80%] mx-auto h-[90vh]">
      <div>
        <Login />
      </div>
      <div>
        <img
          src={LoginImage}
          alt="Login Image"
          className="h-[90vh] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
