"use client";

import { ChakraProvider } from "@chakra-ui/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Provider;
