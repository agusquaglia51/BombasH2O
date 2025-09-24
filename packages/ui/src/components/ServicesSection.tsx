"use client";

import {
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Droplets, Zap, Shield } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Sistemas de Bombeo",
    desc: "Instalación y mantenimiento de sistemas de bombeo de agua...",
    items: [
      "Bombas sumergibles",
      "Bombas centrífugas",
      "Sistemas de presión",
      "Mantenimiento preventivo",
    ],
  },
  {
    icon: Zap,
    title: "Instalaciones Eléctricas",
    desc: "Conexiones eléctricas especializadas para equipos...",
    items: [
      "Tableros de control",
      "Automatización",
      "Protecciones eléctricas",
      "Certificaciones",
    ],
  },
  {
    icon: Shield,
    title: "Mantenimiento",
    desc: "Servicios de mantenimiento preventivo y correctivo...",
    items: [
      "Revisiones periódicas",
      "Reparaciones",
      "Repuestos originales",
      "Soporte técnico 24/7",
    ],
  },
];

export const ServicesSection = () => {
  return (
    <Box
      as="section"
      id="services"
      py={{ base: 12, md: 24, lg: 32 }}
      bg="white"
    >
      <Container maxW="container.lg">
        <VStack spacing={6} textAlign="center" mb={12}>
          <Heading size="2xl">Nuestros Servicios</Heading>
          <Text fontSize="lg" color="gray.600">
            Soluciones profesionales en sistemas de agua. Calidad, confianza y
            servicio excepcional.
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {services.map((service, i) => (
            <Box
              key={i}
              borderWidth="2px"
              borderColor="gray.100"
              _hover={{ borderColor: "blue.200" }}
              p={6}
              rounded="md"
            >
              <Icon as={service.icon} h={12} w={12} color="blue.600" mb={2} />
              <Heading size="md" mb={2}>
                {service.title}
              </Heading>
              <Text mb={4} color="gray.600">
                {service.desc}
              </Text>
              <VStack align="start" spacing={1} fontSize="sm" color="gray.600">
                {service.items.map((item, j) => (
                  <Text key={j}>• {item}</Text>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
