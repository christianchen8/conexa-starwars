import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        yellow:{
          500:"#FFEB1F"
        }
      },
      keyframes: {
        crawl: {
          "0%": {
            top: "0",
            transform: "rotateX(20deg) translateZ(0)",
          },
          "100%": {
            top: "-6000px",
            transform: "rotateX(25deg) translateZ(-2500px)",
          },
        },
      },
      animation: {
        crawl: "crawl 160s linear",
      },
      backgroundImage: {
        space: "url('/space.jpeg')",
        main: "url('/background.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui()],
};

