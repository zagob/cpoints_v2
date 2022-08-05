/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    // screens: {
    //   // lg: "1040px",
    // },
    extend: {
      colors: {
        blue: {
          600: "#1B223C",
          700: "#152E4A",
          800: "#121d30",
        },
      },
    },
  },
  plugins: [],
};
