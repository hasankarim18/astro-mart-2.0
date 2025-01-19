/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.liquid"],
  theme: {
    extend: {
      height: {
        94: "22rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
