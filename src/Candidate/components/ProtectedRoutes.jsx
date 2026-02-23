import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  if (!user.onboardingCompleted) {
    return <Navigate to="/profile" />;
  }

  return children;
};
export default ProtectedRoutes;
