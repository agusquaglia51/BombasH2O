import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Center,
} from "@chakra-ui/react";
import ProductCard from "../../../../../packages/ui/src/components/ProductCard";

export default function ProductosSection() {
  const productos = [
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Bomba Sumergible BS-150",
      status: "Disponible",
      description: "Bomba sumergible de 1.5 HP para pozos profundos",
      details: [
        { label: "Potencia", value: "1.5 HP" },
        { label: "Caudal", value: "150 L/min" },
        { label: "Altura", value: "80 m" },
      ],
      price: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  return (
    <Box as="section" py={{ base: 12, md: 24, lg: 32 }} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={6} textAlign="center" mb={12}>
          <Heading size="2xl" color="gray.900">
            Nuestros Productos
          </Heading>
          <Text fontSize={{ md: "lg" }} color="gray.600">
            Equipos de alta calidad para sistemas de bombeo y distribución de
            agua
          </Text>
        </VStack>

        <HStack spacing={4} justify="center" mb={8} wrap="wrap">
          <Button colorScheme="blue">Todos los Productos</Button>
          <Button variant="outline" colorScheme="blue">
            Bombas Sumergibles
          </Button>
          <Button variant="outline" colorScheme="blue">
            Bombas Centrífugas
          </Button>
          <Button variant="outline" colorScheme="blue">
            Accesorios
          </Button>
          <Button variant="outline" colorScheme="blue">
            Sistemas Completos
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {productos.map((prod, i) => (
            <ProductCard key={i} {...prod} />
          ))}
        </SimpleGrid>

        <Center mt={12} px={4}>
          <Box
            bg="white"
            borderRadius="lg"
            p={8}
            shadow="lg"
            border="2px solid"
            borderColor="blue.100"
            maxW="3xl"
            w="full"
            textAlign="center"
          >
            <Heading size="lg" color="gray.900" mb={4}>
              ¿No encuentras lo que buscas?
            </Heading>
            <Text color="gray.600" mb={6}>
              Contamos con un amplio catálogo de productos y podemos conseguir
              equipos especializados según tus necesidades específicas.
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              justify="center"
            >
              <Button variant="outline" size="lg" colorScheme="blue">
                Solicitar Producto Específico
              </Button>
            </Stack>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}
