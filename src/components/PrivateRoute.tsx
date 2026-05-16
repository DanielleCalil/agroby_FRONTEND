import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { meService } from "../services/me-service";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [status, setStatus] = useState<"checking" | "authorized" | "unauthorized">("checking");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setStatus("unauthorized");
      return;
    }

    meService()
      .then(() => setStatus("authorized"))
      .catch(() => {
        localStorage.removeItem("authToken");
        setStatus("unauthorized");
      });
  }, []);

  if (status === "checking") return null;

  if (status === "unauthorized") return <Navigate to="/login" replace />;

  return <>{children}</>;
};
