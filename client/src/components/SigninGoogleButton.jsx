import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../config/firebase-config";
import googleIcon from "../assets/google-icon.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/features/AuthSlice";
import authService from "../services/authService";
import { useState } from "react";
import Loader from "./Loader";

const SigninGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signinWithGoogle = async () => {
    setIsLoading(true); // optional loading
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log("token", token);

      const data = await authService("/api/auth/login", token);
      console.log("data", data);

      if (!data || !data.user) {
        console.error("Invalid API Response:", data);
        return;
      }

      dispatch(loginSuccess(data));

      if (data.isFirstLogin) {
        navigate("/topics", { replace: true });
      } else {
        navigate("/articles", { replace: true });
      }
    } catch (error) {
      console.error("Google Sign-in error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        onClick={signinWithGoogle}
        className="w-72 h-10 bg-white border rounded-3xl flex items-center cursor-pointer border-black"
      >
        <img src={googleIcon} alt="Google Icon" />
        <span className="w-full text-center">Sign up with Google</span>
      </div>
    </>
  );
};

export default SigninGoogleButton;
