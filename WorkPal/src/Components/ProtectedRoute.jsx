import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    const destination =
      user.role === "profesor"
        ? "/profesor/dashboard"
        : "/home";

    return <Navigate to={destination} replace />;
  }

  return children;
}
