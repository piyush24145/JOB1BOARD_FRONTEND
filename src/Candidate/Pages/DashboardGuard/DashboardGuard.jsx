import { Navigate } from "react-router-dom";

const DashboardGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // onboarding incomplete → redirect to profile
  if (!user?.onboardingCompleted) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default DashboardGuard;
