"use client";
import { Box, VStack, Button } from "@chakra-ui/react";

export const Sidebar = () => {
  return (
    <Box w="180px" h="100vh" bg="blue.400" color="white" p={5} top={0} left={0}>
      <VStack align="start" spacing={4}>
        <Button as="a" href="/productos" _hover={{ color: "teal.300" }}>
          Categorias
        </Button>

        <Button as="a" href="/sobre-nosotros" _hover={{ color: "teal.300" }}>
          Sobre Nosotros
        </Button>
        <Button as="a" href="/configuracion" _hover={{ color: "teal.300" }}>
          Configuración
        </Button>
      </VStack>
    </Box>
  );
};
