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

  const { user } = useSelector((state) => state.auth);

  const signinWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const authData = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL,
      };

      setIsLoading(true);

      const data = await authService("/api/auth/google", authData);

      if (!data || !data.user || !data.token) {
        console.error("Invalid API Response:", data);
        return;
      }

      const { user, token } = data;

      console.log(user);

      dispatch(loginSuccess({ user, token }));
      localStorage.setItem("token", JSON.stringify({ token }));
      setIsLoading(false);
      navigate("/topics");
    } catch (error) {
      console.log(error.message);
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
