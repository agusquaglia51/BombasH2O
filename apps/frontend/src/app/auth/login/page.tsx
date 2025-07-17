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
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
        Iniciar Sesión
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
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

          <FormControl id="password" isRequired>
            <FormLabel color="blue.600">Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="••••••••"
              focusBorderColor="cyan.400"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Iniciar sesión
          </Button>

          <Text fontSize="sm" color="blue.600">
            ¿No tenés una cuenta?{" "}
            <Text
              as="a"
              href={"/auth/register"}
              color="teal.500"
              fontWeight="medium"
            >
              Registrate
            </Text>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
