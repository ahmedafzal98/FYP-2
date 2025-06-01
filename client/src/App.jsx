import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PrivateRoutes from "./pages/PrivateRoutes";
import Articles from "./pages/Articles/index";
import ArticleDetail from "./pages/Articles/Components/ArticleDetail";
import MainNavbar from "./components/MainNavbar";
import WriteArticle from "./pages/WriteArticle";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SaveArticle from "./pages/SaveArticle";
import Loader from "./components/Loader";
import useAuthValidation from "./Hooks/useAuthValidation";
import PublicRoute from "./routes/PublicRoutes";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme.toLowerCase() === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const { loading } = useAuthValidation();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
        {/* Protected Routes Only get the dark background wrapper */}
        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <div className="min-h-screen bg-white dark:bg-gray-800">
                <MainNavbar />
              </div>
            }
          >
            <Route path="/save_article" element={<SaveArticle />} />
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
