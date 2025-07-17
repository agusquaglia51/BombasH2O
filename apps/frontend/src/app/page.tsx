"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Droplets, Zap, Shield, Phone, Mail, MapPin, Star } from "lucide-react";

export default function Dashboard() {
  return (
    <Box minH="100vh" bgGradient="linear(to-br, blue.50, cyan.50)">
      <Box as="main" flex={1}>
        <Box py={{ base: 12, md: 24, lg: 32 }}>
          <Container maxW="container.lg" textAlign="center">
            <VStack spacing={6}>
              <Heading size="3xl" color="gray.900">
                BombasH2O
              </Heading>
              <Text fontSize={{ md: "xl", lg: "2xl" }} color="gray.600">
                Soluciones profesionales en sistemas de agua. Calidad, confianza
                y servicio excepcional.
              </Text>
              <Stack direction="row" spacing={4} pt={4}>
                <Button as="a" size="lg" colorScheme="blue" href="/#quotation">
                  Solicitar Cotización
                </Button>
              </Stack>
            </VStack>
          </Container>
        </Box>

        {/* Services Section */}
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
                Soluciones profesionales en sistemas de agua. Calidad, confianza
                y servicio excepcional.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {[
                {
                  icon: Droplets,
                  title: "Sistemas de Bombeo",
                  desc: "Instalación y mantenimiento de sistemas de bombeo de agua para uso residencial y comercial",
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
                  desc: "Conexiones eléctricas especializadas para equipos de bombeo y sistemas de agua",
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
                  desc: "Servicios de mantenimiento preventivo y correctivo para garantizar el funcionamiento óptimo",
                  items: [
                    "Revisiones periódicas",
                    "Reparaciones",
                    "Repuestos originales",
                    "Soporte técnico 24/7",
                  ],
                },
              ].map((service, i) => (
                <Box
                  key={i}
                  borderWidth="2px"
                  borderColor="gray.100"
                  _hover={{ borderColor: "blue.200" }}
                  p={6}
                  rounded="md"
                >
                  <Icon
                    as={service.icon}
                    h={12}
                    w={12}
                    color="blue.600"
                    mb={2}
                  />
                  <Heading size="md" mb={2}>
                    {service.title}
                  </Heading>
                  <Text mb={4} color="gray.600">
                    {service.desc}
                  </Text>
                  <VStack
                    align="start"
                    spacing={1}
                    fontSize="sm"
                    color="gray.600"
                  >
                    {service.items.map((item, j) => (
                      <Text key={j}>• {item}</Text>
                    ))}
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* About Section */}
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
                  brindar soluciones confiables y eficientes para sistemas de
                  agua.
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
                  Proporcionar soluciones integrales en sistemas de agua con la
                  más alta calidad, utilizando tecnología de vanguardia y un
                  equipo de profesionales altamente capacitados para satisfacer
                  las necesidades de nuestros clientes.
                </Text>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box
          as="section"
          id="contact"
          py={{ base: 12, md: 24, lg: 32 }}
          bg="white"
        >
          <Container maxW="container.lg">
            <VStack spacing={6} textAlign="center" mb={12}>
              <Heading size="2xl">Contáctanos</Heading>
              <Text fontSize="lg" color="gray.600">
                Estamos aquí para ayudarte con todas tus necesidades de sistemas
                de agua
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
                      Av. Constitución 6898, B7604EKS Mar del Plata, Provincia
                      de Buenos Aires
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
      </Box>

      {/* Footer */}
      <Flex
        as="footer"
        direction={{ base: "column", sm: "row" }}
        py={6}
        w="full"
        align="center"
        px={{ base: 4, md: 6 }}
        borderTop="1px"
        borderColor="gray.200"
        bg="gray.50"
        justify="space-between"
      >
        <Flex align="center" gap={2}>
          <Icon as={Droplets} h={5} w={5} color="blue.600" />
          <Text fontWeight="semibold" color="gray.900">
            BombasH2O
          </Text>
        </Flex>
        <Text fontSize="xs" color="gray.500">
          © {new Date().getFullYear()} BombasH2O. Todos los derechos
          reservados.
        </Text>
      </Flex>
    </Box>
  );
}
