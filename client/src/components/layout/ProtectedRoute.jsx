import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/token";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn, loading, setLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    if (isLoggedIn === false) {
      navigate("/register");
    }
    setLoading(true);
  }, [isLoggedIn, loading, setLoading, navigate]);

  if (!loading) {
    return <p>Loading...</p>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
