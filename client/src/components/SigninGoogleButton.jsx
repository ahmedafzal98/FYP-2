import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../config/firebase-config";
import googleIcon from "../assets/google-icon.png";

const SigninGoogleButton = () => {
  const signinWithGoogle = async () => {
    try {
      const BASE_URL = import.meta.env.BASE_URL;
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={signinWithGoogle}
      className="w-72 h-10 bg-white border rounded-3xl flex items-center cursor-pointer border-black"
    >
      <img src={googleIcon} alt="Google Icon" />

      <span className="w-full text-center">Sign up with Google</span>
    </div>
  );
};

export default SigninGoogleButton;
