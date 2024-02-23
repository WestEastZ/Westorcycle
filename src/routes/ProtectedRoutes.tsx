import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  condition: boolean | null | undefined;
}

export const ProtectedRoute = ({
  children,
  condition,
}: ProtectedRouteProps) => {
  return condition ? children : <Navigate to="/" />;
};
