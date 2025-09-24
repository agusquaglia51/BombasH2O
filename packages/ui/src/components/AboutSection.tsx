"use client";

import {
  SimpleGrid,
  Flex,
  Text,
  Icon,
  Heading,
  VStack,
  Container,
  Box,
} from "@chakra-ui/react";
import { Star } from "lucide-react";

export const AboutSection = () => {
  return (
    <Box
      as="section"
      id="about"
      py={{ base: 12, md: 24, lg: 32 }}
      bgGradient="linear(to-r, blue.600, cyan.600)"
      color="white"
    >
      <Container maxW="full" px={{ base: 4, md: 12 }}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={12}
          alignItems="center"
        >
          <VStack spacing={4} align="start">
            <Heading size="2xl">¿Por qué elegir BombasH2O?</Heading>
            <Text color="blue.100" fontSize="lg">
              Con años de experiencia en el sector, nos especializamos en
              brindar soluciones confiables y eficientes para sistemas de agua.
            </Text>
            <SimpleGrid columns={2} spacing={4} minW="700px">
              {[
                "Contamos con 30 años de experiencia",
                "Equipo de profesionales",
                "Atención personalizada",
                "Soluciones a medida",
                "Tecnología de vanguardia",
                "Soporte técnico especializado",
                "Calidad garantizada",
                "Precios competitivos",
              ].map((label, i) => (
                <Flex key={i} align="center" gap={2}>
                  <Icon as={Star} color="yellow.400" />
                  <Text>{label}</Text>
                </Flex>
              ))}
            </SimpleGrid>
          </VStack>
          <Box
            bg="whiteAlpha.200"
            backdropFilter="blur(4px)"
            rounded="lg"
            p={6}
          >
            <Heading size="md" mb={4}>
              Nuestra Misión
            </Heading>
            <Text color="blue.100">
              Proporcionar soluciones integrales en sistemas de agua con la más
              alta calidad, utilizando tecnología de vanguardia y un equipo de
              profesionales altamente capacitados para satisfacer las
              necesidades de nuestros clientes.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AboutSection;
