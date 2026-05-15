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
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { tipo_conta: "cliente" }
  });

  const tipoConta = watch("tipo_conta") || "cliente";

  const handleTipoContaChange = (value: RegisterFormData["tipo_conta"]) => {
    setValue("tipo_conta", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    setApiError(null);
    try {
      const tipoContaAtual = getValues("tipo_conta") || "cliente";

      const payload = {
        tipo_conta: tipoContaAtual,
        nome: data.nome,
        email: data.email,
        whatsapp: data.whatsapp,
        password: data.password,
      };

      if (payload.tipo_conta === "produtor") {
        Object.assign(payload, {
          nome_propriedade: data.nome_propriedade,
          endereco_rural: data.endereco_rural,
        });
      }

      await registerService(payload);
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
    handleTipoContaChange,
  };
};
