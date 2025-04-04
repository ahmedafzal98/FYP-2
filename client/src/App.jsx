import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./store/features/AuthSlice";
import PrivateRoutes from "./pages/PrivateRoutes";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import MainNavbar from "./components/MainNavbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<MainNavbar />}>
            <Route path="/articles" element={<Articles />} />
            <Route path="/articleDetail" element={<ArticleDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
