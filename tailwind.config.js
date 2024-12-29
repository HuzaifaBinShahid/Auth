/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'br-bottom': '#FFFFFF21',
      },
      backgroundImage: {
        'bgImage': "url('https://pixor-react.wpolive.com/static/media/bg-shap.de1636bd491312296dd2cd2b7d5d9ead.svg')",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".stroke-white": {
          "-webkit-text-stroke": "1px white",
          "text-fill-color": "transparent", 
        },
      });
    }),
  ],
}