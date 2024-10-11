import Signup from "../../components/Auth/Signup";
import SignupImage from "../../assets/signup.jpeg";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-2 justify-center items-center m-6 rounded-lg bg-white">
      <div>
        <img src={SignupImage} alt="Signup Image" />
      </div>
      <div>
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
