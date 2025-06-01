import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import useAuthValidation from "../hooks/useAuthValidation";
import Loader from "../components/Loader";

const PrivateRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useAuthValidation(); // validate token on protected route

  if (loading) return <Loader />;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
