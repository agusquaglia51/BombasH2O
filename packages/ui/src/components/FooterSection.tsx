"use client";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { Droplets } from "lucide-react";

export const FooterSection = () => {
  return (
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
        © {new Date().getFullYear()} BombasH2O. Todos los derechos reservados.
      </Text>
    </Flex>
  );
};

export default FooterSection;
