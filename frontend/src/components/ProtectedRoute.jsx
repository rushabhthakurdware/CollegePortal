import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

export default function ProtectedRoute({ children, allowedRole }) {
  const role = getRole();

  if (!role) {
    return <Navigate to="/" />; // not logged in
  }

  if (role !== allowedRole) {
    return <Navigate to="/" />; // wrong role
  }

  return children;
}
