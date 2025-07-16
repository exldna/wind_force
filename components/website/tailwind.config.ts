import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#121212",
          800: "#303030",
          700: "#424242",
          600: "#757575",
          500: "#9e9e9e",
          300: "#e0e0e0",
          100: "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
