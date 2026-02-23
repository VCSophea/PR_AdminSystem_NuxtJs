import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// * Brand green palette (matches --color-primary: #008f39)
const AdminPreset = definePreset(Aura, {
  semantic: {
    // * Primary color → green brand
    primary: {
      50: "{green.50}",
      100: "{green.100}",
      200: "{green.200}",
      300: "{green.300}",
      400: "{green.400}",
      500: "{green.500}",
      600: "{green.600}",
      700: "{green.700}",
      800: "{green.800}",
      900: "{green.900}",
      950: "{green.950}",
    },

    // * Surface palette — zinc in light, zinc in dark (consistent neutral tone)
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
    },
  },
});

export default {
  preset: AdminPreset,
  options: {
    prefix: "p",
    darkModeSelector: ".dark",
    cssLayer: false,
  },
};
