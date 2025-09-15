"use client";
import { AuthService } from "@/app/services/authService";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  FormErrorMessage,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      cellphone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await AuthService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        cellphone: data.cellphone,
        password: data.password,
      });

      toast({
        title: "Account created.",
        description: result.message || "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Error.",
        description: "There was an error creating your account.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Box
      width="400px"
      p={6}
      bg="white"
      borderWidth={1}
      borderColor="blue.200"
      borderRadius="xl"
      boxShadow="md"
    >
      <Text
        fontSize="2xl"
        mb={4}
        fontWeight="bold"
        color="blue.700"
        textAlign="center"
      >
        Registrate
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl id="firstName" isInvalid={!!errors.firstName} isRequired>
            <FormLabel color="blue.600">Nombre</FormLabel>
            <Input
              type="text"
              placeholder="nombre"
              focusBorderColor="cyan.400"
              {...register("firstName", {
                required: "El nombre es requerido",
                maxLength: {
                  value: 20,
                  message: "El nombre no puede exceder 20 caracteres",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
              })}
            />
            {errors.firstName && (
              <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="lastName" isInvalid={!!errors.lastName} isRequired>
            <FormLabel color="blue.600">Apellido</FormLabel>
            <Input
              type="text"
              placeholder="apellido"
              focusBorderColor="cyan.400"
              {...register("lastName", {
                required: "El apellido es requerido",
                maxLength: {
                  value: 20,
                  message: "El apellido no puede exceder 20 caracteres",
                },
                minLength: {
                  value: 2,
                  message: "El apellido debe tener al menos 2 caracteres",
                },
              })}
            />
            {errors.lastName && (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="cellphone" isInvalid={!!errors.cellphone} isRequired>
            <FormLabel color="blue.600">Numero de contacto</FormLabel>
            <Input
              type="tel"
              placeholder="+54 9 11 1234-5678"
              focusBorderColor="cyan.400"
              {...register("cellphone", {
                required: "El número de contacto es requerido",
                pattern: {
                  value: /^\+?\d{1,3}?\s?\d{1,4}?\s?\d{4,}$/,
                  message: "Formato de teléfono inválido",
                },
              })}
            />
            {errors.cellphone && (
              <FormErrorMessage>{errors.cellphone.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="email" isInvalid={!!errors.email} isRequired>
            <FormLabel color="blue.600">Correo electrónico</FormLabel>
            <Input
              type="email"
              placeholder="email@ejemplo.com"
              focusBorderColor="cyan.400"
              {...register("email", {
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: "Formato de correo electrónico inválido",
                },
              })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <Tooltip
            hasArrow
            placement="right-end"
            label="La contraseña debe tener al menos 8 caracteres, una mayúscula,
                  una minúscula, un número y un carácter especial."
          >
            <FormControl id="password" isInvalid={!!errors.password} isRequired>
              <FormLabel color="blue.600">Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                focusBorderColor="cyan.400"
                {...register("password", {
                  required: "La contraseña es requerida",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message: "La contraseña no cumple con los requisitos",
                  },
                })}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
          </Tooltip>

          <FormControl
            id="confirmPassword"
            isInvalid={!!errors.confirmPassword}
            isRequired
          >
            <FormLabel color="blue.600">Confirme la contraseña</FormLabel>
            <Input
              type="password"
              placeholder="••••••••"
              focusBorderColor="cyan.400"
              {...register("confirmPassword", {
                required: "La confirmación de contraseña es requerida",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <FormErrorMessage>
                {errors.confirmPassword.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme={isValid ? "teal" : "gray"}
            width="full"
            isLoading={isSubmitting}
            loadingText="Creando cuenta..."
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Registrarse
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUp;
