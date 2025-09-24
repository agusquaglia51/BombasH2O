import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Droplets, Zap, Shield, Phone, Mail, MapPin, Star } from "lucide-react";
import ServicesSection from "@ui/components/ServicesSection";
import ContactSection from "@ui/components/ContactSection";
import FooterSection from "@ui/components/FooterSection";
import AboutSection from "@ui/components/AboutSection";

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
        <ServicesSection />

        {/* About Section */}
        <AboutSection />

        {/*Contact Section */}
        <ContactSection />
      </Box>
      {/* Footer section */}
      <FooterSection />
    </Box>
  );
}
