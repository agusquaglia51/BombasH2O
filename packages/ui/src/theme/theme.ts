'use client';
import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/theme";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  aqua: {
    50: "#e0f7fa",
    100: "#b2ebf2",
    200: "#80deea",
    300: "#4dd0e1",
    400: "#26c6da",
    500: "#00bcd4",
    600: "#00acc1",
    700: "#0097a7",
    800: "#00838f",
    900: "#006064",
  },
};

const components = {
  Button: {
    defaultProps: {
      colorScheme: "aqua",
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: "aqua.500",
    },
  },
};

const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
};

const theme = extendTheme({
  config,
  colors,
  components,
  fonts,
});

export default theme;
