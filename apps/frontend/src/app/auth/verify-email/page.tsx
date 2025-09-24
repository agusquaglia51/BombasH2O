"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Text, Spinner, Button } from "@chakra-ui/react";

const VerifyEmail = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verify = async () => {
      const email = params.get("email");
      const token = params.get("token");
      if (!email || !token) {
        setSuccess(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/verify-email?email=${email}&token=${token}`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error("Verification failed");

        setSuccess(true);
      } catch (error) {
        console.error("Email verification failed:", error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [params]);

  // Manejo del contador y redirección automática
  useEffect(() => {
    if (!loading && success !== null) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        if (success) {
          router.push("/auth/login");
        } else {
          router.push("/");
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [loading, success, router]);

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Verificando tu email...</Text>
      </Box>
    );
  }

  if (success) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="2xl" fontWeight="bold" color="green.500">
          ✅ Email verificado con éxito
        </Text>
        <Text mt={2}>
          Tu cuenta ya está activa. Ahora puedes iniciar sesión.
        </Text>
        <Text mt={4} color="gray.500">
          Serás redirigido al login en {countdown} segundos...
        </Text>
        <Button
          mt={6}
          colorScheme="teal"
          onClick={() => router.push("/auth/login")}
        >
          Ir a iniciar sesión ahora
        </Button>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={20}>
      <Text fontSize="2xl" fontWeight="bold" color="red.500">
        ❌ Error en la verificación
      </Text>
      <Text mt={2}>
        No se pudo verificar tu email. El enlace puede haber expirado.
      </Text>
      <Text mt={4} color="gray.500">
        Serás redirigido al inicio en {countdown} segundos...
      </Text>
      <Button mt={6} colorScheme="red" onClick={() => router.push("/")}>
        Volver al inicio ahora
      </Button>
    </Box>
  );
};

export default VerifyEmail;
