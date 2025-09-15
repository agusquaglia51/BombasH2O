"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Text, Spinner, useToast } from "@chakra-ui/react";

const VerifyEmail = () => {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const email = params.get("email");
      const token = params.get("token");
      if (!email || !token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/verify-email?email=${email}&token=${token}`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error("Verification failed");

        toast({
          title: "Email verificado!",
          description: "Tu cuenta ya está activa. Ahora puedes iniciar sesión.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        router.push("/auth/login");
      } catch (error) {
        console.log("Email verification failed:", error);
        toast({
          title: "Error",
          description: "No se pudo verificar tu email.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [params, router, toast]);

  return (
    <Box textAlign="center" mt={20}>
      {loading ? <Spinner size="xl" /> : <Text>Verificación finalizada.</Text>}
    </Box>
  );
};

export default VerifyEmail;
