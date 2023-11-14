/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            dark: "#1F384C",
            "primary-dark": "#5A67BA",
            "primary-light": "#C7CEFF",
            "primary-hov": "#6370c5",
            "secondary-dark": "#F99C30",
            "secondary-hover": "#ffae52",

         },
         spacing: {
            "100": "28rem",
            "104": "32rem",
            "110" : "38rem"
         },
      },
   },
   plugins: ["prettier-plugin-tailwindcss"],
};
