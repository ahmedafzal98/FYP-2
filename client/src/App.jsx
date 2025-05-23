import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./store/features/AuthSlice";
import PrivateRoutes from "./pages/PrivateRoutes";
import Articles from "./pages/Articles/index";
import ArticleDetail from "./pages/Articles/Components/ArticleDetail";
import MainNavbar from "./components/MainNavbar";
import WriteArticle from "./pages/WriteArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<MainNavbar />}>
            <Route path="/articles" element={<Articles />} />
            <Route path="/articleDetail/:id" element={<ArticleDetail />} />
            <Route path="/writeArticle" element={<WriteArticle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
