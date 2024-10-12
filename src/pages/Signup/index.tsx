import Signup from "../../components/Auth/Signup";
import SignupImage from "../../assets/signup.jpeg";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-2 justify-center items-center my-6 rounded-lg bg-white w-[80%] mx-auto h-[90vh]">
      <div>
        <Signup />
      </div>
      <div>
        <img src={SignupImage} alt="Signup Image" className="h-[90vh] w-full" />
      </div>
    </div>
  );
};

export default SignupPage;
