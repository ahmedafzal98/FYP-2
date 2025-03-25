// import { auth, provider } from "./config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import "firebase/auth";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";

function App() {
  const base_url = import.meta.env.VITE_BASE_URL;
  // useEffect(() => {
  //   const auth = localStorage.getItem("auth");
  //   console.log(auth);
  // }, []);

  const handleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const token = await data.user.getIdToken();
      const email = data.user.email;
      localStorage.setItem("auth", email);
      const response = await fetch(base_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          userData: {
            uid: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
            photoUrl: data.user.photoURL,
          },
        }),
      });
      if (response.ok) {
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
