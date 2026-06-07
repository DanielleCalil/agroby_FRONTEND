import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginFormData } from "../resolver";
import { loginService } from "../service/login-service";
import { HttpError } from "../../../services/http-error";

export const useLogin = () => {
  const navigate = useNavigate();
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
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof HttpError && err.status === 401) {
        setApiError("Credenciais inválidas. Verifique seu e-mail e senha.");
        return;
      }

      if (err instanceof HttpError && err.status === 403) {
        sessionStorage.setItem(
          "authToast",
          "Conta bloqueada. Solicite redefinição de senha para recuperar o acesso.",
        );
        navigate("/esqueci-senha", { replace: true });
        return;
      }

      setApiError("Não foi possível realizar login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, errors, handleLogin, loading, apiError };
};
