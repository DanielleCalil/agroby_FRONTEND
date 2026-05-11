import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema, RegisterFormData } from "../resolver";
import { registerService } from "../service/cadastro-service";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { tipo_conta: "cliente" }
  });

  const tipoConta = watch("tipo_conta");

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    setApiError(null);
    try {
      await registerService(data);
      alert("Conta criada com sucesso!");
      window.location.href = "/login";
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { 
    register, 
    handleSubmit, 
    errors, 
    handleRegister, 
    loading, 
    apiError, 
    tipoConta, 
    setValue 
  };
};