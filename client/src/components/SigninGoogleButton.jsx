import googleIcon from "../assets/google-icon.png";
const SigninGoogleButton = () => {
  return (
    <div className="w-72 h-10 bg-white border rounded-3xl flex items-center cursor-pointer border-black">
      <img src={googleIcon} alt="Google Icon" />

      <span className="w-full text-center">Sign up with Google</span>
    </div>
  );
};

export default SigninGoogleButton;
