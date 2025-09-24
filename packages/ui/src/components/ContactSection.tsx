"use client";
import {
  VStack,
  SimpleGrid,
  Flex,
  Input,
  Textarea,
  Button,
  Text,
  Heading,
  Container,
  Box,
  Icon,
} from "@chakra-ui/react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <Box as="section" id="contact" py={{ base: 12, md: 24, lg: 32 }} bg="white">
      <Container maxW="container.lg">
        <VStack spacing={6} textAlign="center" mb={12}>
          <Heading size="2xl">Contáctanos</Heading>
          <Text fontSize="lg" color="gray.600">
            Estamos aquí para ayudarte con todas tus necesidades de sistemas de
            agua
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <VStack align="start" spacing={6}>
            <Flex align="center" gap={4}>
              <Icon as={Phone} h={6} w={6} color="blue.600" />
              <Box>
                <Heading size="sm">Teléfono</Heading>
                <Text color="gray.600">0223 15-422-3086</Text>
              </Box>
            </Flex>
            <Flex align="center" gap={4}>
              <Icon as={Mail} h={6} w={6} color="blue.600" />
              <Box>
                <Heading size="sm">Email</Heading>
                <Text color="gray.600">bombash2oeq@gmail.com</Text>
              </Box>
            </Flex>
            <Flex align="center" gap={4}>
              <Icon as={MapPin} h={6} w={6} color="blue.600" />
              <Box>
                <Heading size="sm">Dirección</Heading>
                <Text color="gray.600">
                  Av. Constitución 6898, B7604EKS Mar del Plata, Provincia de
                  Buenos Aires
                </Text>
              </Box>
            </Flex>
          </VStack>
          <Box
            as="section"
            id="quotation"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="md"
            p={6}
          >
            <Heading size="md" mb={2}>
              Solicitar Cotización
            </Heading>
            <Text mb={4} color="gray.600">
              Completa el formulario y nos pondremos en contacto contigo
            </Text>
            <VStack spacing={4}>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="100%">
                <Input placeholder="Nombre" />
                <Input placeholder="Teléfono" />
              </SimpleGrid>
              <Input placeholder="Email" type="email" />
              <Textarea
                placeholder="Describe tu proyecto o necesidad"
                minH="100px"
              />
              <Button w="full" colorScheme="blue">
                Enviar Solicitud
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ContactSection;
