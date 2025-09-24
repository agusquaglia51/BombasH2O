"use client";
import { Button, Flex, Text, Icon, Stack, HStack } from "@chakra-ui/react";
import { Droplets, ShoppingCart } from "lucide-react";

export interface HeaderProps {
  user: { email: string; first_name: string } | null;
}

export const Header = () => {
  const user = null;
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={{ base: 4, lg: 6 }}
      h="16"
      bg="whiteAlpha.800"
      backdropFilter="blur(8px)"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center" as="a" href="/">
        <Icon as={Droplets} h={8} w={8} color="blue.600" />
        <Text ml={2} fontSize="2xl" fontWeight="bold" color="gray.900">
          BombasH2O
        </Text>
      </Flex>

      <Stack direction="row" spacing={6}>
        <Button as="a" variant="link" colorScheme="blue" href="/products">
          Productos
        </Button>
        <Button as="a" variant="link" colorScheme="blue" href="/#services">
          Servicios
        </Button>
        <Button as="a" variant="link" colorScheme="blue" href="/#about">
          Nosotros
        </Button>
        <Button as="a" variant="link" colorScheme="blue" href="/#contact">
          Contacto
        </Button>
      </Stack>

      <HStack>
        <Button
          as="a"
          href="/checkout"
          colorScheme="violet"
          variant="outline"
          size="sm"
        >
          <Icon as={ShoppingCart} />
        </Button>

        {user ? (
          <Button
            as="a"
            href="/api/logout"
            colorScheme="red"
            variant="outline"
            size="sm"
          >
            Logout
          </Button>
        ) : (
          <Button
            as="a"
            href="/auth/login"
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            Iniciar Sesión
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;
