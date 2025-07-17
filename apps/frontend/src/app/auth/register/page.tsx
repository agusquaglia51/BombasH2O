"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  FormErrorMessage,
  FormHelperText,
  Tooltip,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  fistName: string;
  lastName: string;
  email: string;
  cellphone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValidating, isDirty, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      fistName: "",
      lastName: "",
      email: "",
      cellphone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log("Registro exitoso:", data);
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
      });
  };

  console.log("isValidating", isValidating);
  console.log(errors);

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
          <FormControl id="fistName" isRequired>
            <FormLabel color="blue.600">Nombre</FormLabel>
            <Input
              type="text"
              placeholder="nombre"
              focusBorderColor="cyan.400"
              {...register("fistName", { required: true, maxLength: 20 })}
            />
          </FormControl>
          {isDirty && errors.fistName && (
            <FormErrorMessage>{errors.fistName.message}</FormErrorMessage>
          )}

          <FormControl id="lastName" isRequired>
            <FormLabel color="blue.600">Apellido</FormLabel>
            <Input
              type="text"
              placeholder="apellido"
              focusBorderColor="cyan.400"
              {...register("lastName", { required: true, maxLength: 20 })}
            />
            {errors.lastName && (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="telephone" isRequired>
            <FormLabel color="blue.600">Numero de contacto</FormLabel>
            <Input
              type="number"
              placeholder="+54 9 11 1234-5678"
              focusBorderColor="cyan.400"
              {...register("cellphone", { required: true })}
            />
            {errors.cellphone && (
              <FormErrorMessage>{errors.cellphone.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel color="blue.600">Correo electrónico</FormLabel>
            <Input
              type="email"
              placeholder="email@ejemplo.com"
              focusBorderColor="cyan.400"
              {...register("email", { required: true })}
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
            <FormControl id="password" isRequired>
              <FormLabel color="blue.600">Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                focusBorderColor="cyan.400"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                })}
              />

              {errors.password && (
                <FormErrorMessage>
                  La contraseña no cumple con los requisitos
                </FormErrorMessage>
              )}
            </FormControl>
          </Tooltip>

          <FormControl id="confirmPassword" isRequired>
            <FormLabel color="blue.600">Confirme la contraseña</FormLabel>
            <Input
              type="confirmPassword"
              placeholder="••••••••"
              focusBorderColor="cyan.400"
              {...register("password", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
            />
            {errors.confirmPassword && (
              <FormErrorMessage>Las contraseñas no coinciden</FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
