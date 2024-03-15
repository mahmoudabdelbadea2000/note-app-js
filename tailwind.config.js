/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#EC7160",
        "sec-color": "#898989",
        "border-color": "#e7e7e9",
        "section-color": "#F6F6F6",
        "heading-color": "#303030",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        aclonica: ["Aclonica", "sans-serif"],
      },
      fontSize: {
        "main-size": "13px",
      },
      boxShadow: {
        "icon-shadow": "0 9px 25px #EC716042",
      },
    },
  },
  plugins: [],
};
