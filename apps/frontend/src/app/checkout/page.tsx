"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Badge,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Input,
  Divider,
} from "@chakra-ui/react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  inStock: boolean;
}

export const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    /* ... */
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "descuento10") {
      setAppliedPromo("DESCUENTO10");
      setPromoCode("");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.21;
  const total = subtotal - discount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <Box minH="100vh" bg="gray.50" py={8} px={4} textAlign="center">
        <VStack spacing={4} pt={20}>
          <Icon as={ShoppingBag} boxSize={16} color="gray.400" />
          <Heading size="md">Tu carrito está vacío</Heading>
          <Text color="gray.600">
            Agrega algunos productos para comenzar tu compra
          </Text>
          <Button as={Link} href="/products" colorScheme="blue">
            Continuar comprando
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" py={8} px={4}>
      <Container maxW="6xl">
        <Button
          as={Link}
          href="/"
          variant="ghost"
          mb={4}
          leftIcon={<ArrowLeft size={16} />}
        >
          Continuar comprando
        </Button>

        <Heading size="xl" mb={2}>
          Carrito de compras
        </Heading>
        <Text color="gray.600" mb={8}>
          {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"}{" "}
          en tu carrito
        </Text>

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
          <Box gridColumn={{ lg: "span 2" }}>
            <Stack spacing={4}>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  shadow="sm"
                  position="relative"
                >
                  <Flex gap={4}>
                    <Box position="relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="120px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      {!item.inStock && (
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          w="full"
                          h="full"
                          bg="blackAlpha.600"
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Badge colorScheme="red">Sin stock</Badge>
                        </Box>
                      )}
                    </Box>

                    <Box flex={1}>
                      <Flex justify="space-between">
                        <Box>
                          <Heading size="sm">{item.name}</Heading>
                          <Text fontSize="sm" color="gray.600">
                            {item.size && `Talla: ${item.size} `}
                            {item.color && `Color: ${item.color}`}
                          </Text>
                        </Box>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Icon
                            as={Trash2}
                            boxSize={4}
                            color="gray.500"
                            _hover={{ color: "red.500" }}
                          />
                        </Button>
                      </Flex>

                      <Flex justify="space-between" mt={4}>
                        <HStack>
                          <Button
                            size="sm"
                            variant="outline"
                            isDisabled={item.quantity <= 1 || !item.inStock}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Icon as={Minus} boxSize={3} />
                          </Button>
                          <Text>{item.quantity}</Text>
                          <Button
                            size="sm"
                            variant="outline"
                            isDisabled={!item.inStock}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Icon as={Plus} boxSize={3} />
                          </Button>
                        </HStack>
                        <Box textAlign="right">
                          <Text fontWeight="bold">
                            €{(item.price * item.quantity).toFixed(2)}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            €{item.price.toFixed(2)} cada uno
                          </Text>
                          {item.originalPrice && (
                            <Text
                              fontSize="xs"
                              textDecor="line-through"
                              color="gray.400"
                            >
                              €{item.originalPrice.toFixed(2)}
                            </Text>
                          )}
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>

          <Stack spacing={6}>
            <Box bg="white" p={6} rounded="lg" shadow="sm">
              <HStack mb={4}>
                <Icon as={Tag} />
                <Text fontWeight="medium">Código promocional</Text>
              </HStack>
              <HStack>
                <Input
                  placeholder="Ingresa tu código"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={applyPromoCode} variant="outline">
                  Aplicar
                </Button>
              </HStack>
              {appliedPromo && (
                <Box mt={4} bg="green.50" p={3} borderRadius="md">
                  <Text fontSize="sm" color="green.800">
                    ✓ Código {appliedPromo} aplicado - 10% de descuento
                  </Text>
                </Box>
              )}
            </Box>

            <Box bg="white" p={6} rounded="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Resumen del pedido
              </Heading>
              <Stack spacing={2}>
                <Flex justify="space-between">
                  <Text>Subtotal</Text>
                  <Text>€{subtotal.toFixed(2)}</Text>
                </Flex>
                {discount > 0 && (
                  <Flex justify="space-between" color="green.600">
                    <Text>Descuento</Text>
                    <Text>-€{discount.toFixed(2)}</Text>
                  </Flex>
                )}
                <Flex justify="space-between">
                  <Text>Envío</Text>
                  <Text>
                    {shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>IVA (21%)</Text>
                  <Text>€{tax.toFixed(2)}</Text>
                </Flex>
              </Stack>
              <Divider my={4} />
              <Flex justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text>€{total.toFixed(2)}</Text>
              </Flex>
              {subtotal < 100 && (
                <Text
                  fontSize="sm"
                  color="blue.600"
                  bg="blue.50"
                  p={2}
                  mt={4}
                  borderRadius="md"
                >
                  Agrega €{(100 - subtotal).toFixed(2)} más para envío gratuito
                </Text>
              )}
              <Stack mt={6}>
                <Button colorScheme="blue" size="lg">
                  Proceder al pago
                </Button>
                <Button as={Link} href="/" variant="outline" size="lg">
                  Continuar comprando
                </Button>
              </Stack>
            </Box>

            <Box bg="white" p={6} rounded="lg" shadow="sm" textAlign="center">
              <Text fontWeight="medium" mb={2}>
                Compra 100% segura
              </Text>
              <Text fontSize="sm" color="gray.600">
                Tus datos están protegidos con encriptación SSL
              </Text>
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Checkout;
