import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import useAuthValidation from "../hooks/useAuthValidation";
import Loader from "../components/Loader";

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useAuthValidation();

  if (loading) return <Loader />;

  return user ? <Navigate to="/articles" replace /> : <Outlet />;
};

export default PublicRoute;
