import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@ui/theme";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Provider;
