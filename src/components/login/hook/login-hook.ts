import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema, LoginFormData } from "../resolver";
import { loginService } from "../service/login-service";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    setApiError(null);
    try {
      await loginService(data);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, errors, handleLogin, loading, apiError };
};
