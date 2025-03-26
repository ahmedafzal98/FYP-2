import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
