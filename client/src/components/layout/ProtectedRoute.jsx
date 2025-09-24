import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/token";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isLoggedIn === false) {
      navigate("/register");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
