/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Sedgwick: ["Sedgwick Ave Display", "cursive"],
        Oswald: ["Oswald", "sans-serif"],
        Barlow: ["Barlow Condensed", "sans-serif"],
        Fjalla: ["Fjalla One", "sans-serif"],

        Teko: ["Teko", "sans-serif"],
      },
      colors: {
        primaryColor: "#9455f0",
        secondaryColor: "#ffffff",
        primaryColorDull: "#3B038F",
      },
      boxShadow: {
        backButton: "-3px -5px 10px 5px rgba(0, 0, 0 , 0.4)",
        sideBar: "-9px 1px 24px -5px rgba(0,0,0,0.75);",
        message: "2px 1px 24px -5px rgba(0,0,0,0.75);",
      },
    },
  },
  plugins: [],
};
