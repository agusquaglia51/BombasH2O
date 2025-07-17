import {
  Box,
  Flex,
  Heading,
  Badge,
  VStack,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";

type ProductCardProps = {
  title: string;
  status: string;
  description: string;
  details: { label: string; value: string }[];
  price: string;
  image: string;
};

export const ProductCard = ({
  title,
  status,
  description,
  details,
  price,
  image,
}: ProductCardProps) => (
  <Box
    borderWidth="2px"
    borderRadius="lg"
    overflow="hidden"
    _hover={{ shadow: "lg", borderColor: "blue.200" }}
    transition="all 0.3s"
  >
    <Box bgGradient="linear(to-br, blue.100, cyan.100)" aspectRatio={1}>
      <Image
        src={image}
        alt={title}
        objectFit="cover"
        w="full"
        h="full"
        transition="transform 0.3s"
        _groupHover={{ transform: "scale(1.05)" }}
      />
    </Box>
    <Box p={4}>
      <Flex justify="space-between" align="start">
        <Heading size="md">{title}</Heading>
        <Badge colorScheme="green" fontSize="xs">
          {status}
        </Badge>
      </Flex>
      <Text fontSize="sm" color="gray.600" mt={1}>
        {description}
      </Text>
      <VStack spacing={1} align="stretch" mt={4} fontSize="sm" color="gray.600">
        {details.map((detail, i) => (
          <Flex key={i} justify="space-between">
            <Text>{detail.label}</Text>
            <Text fontWeight="medium">{detail.value}</Text>
          </Flex>
        ))}
      </VStack>
      <Flex mt={4} justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
          {price}
        </Text>
        <Button size="sm" colorScheme="blue">
          Agregar al Carrito
        </Button>
      </Flex>
    </Box>
  </Box>
);

export default ProductCard;
