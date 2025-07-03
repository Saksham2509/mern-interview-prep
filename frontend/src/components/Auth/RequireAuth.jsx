import { useUser } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

export default RequireAuth;
