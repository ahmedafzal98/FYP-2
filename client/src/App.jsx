import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/features/AuthSlice";
import PrivateRoutes from "./pages/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/topics" element={<Topics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
