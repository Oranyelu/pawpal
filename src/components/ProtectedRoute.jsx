import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Simple check — replace this with user.role === 'admin' if you add roles later
  if (adminOnly && user.email !== "admin@email.com") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
