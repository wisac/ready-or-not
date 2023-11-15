/** @type {import('tailwindcss').Config} */


export default {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            secondary: "#1f384c",
            "secondary-light": "#4c6088",
            "secondary-lighter": "rgba(31, 56, 77, 0.151)",
            "primary-dark": "#646dac",
            primary: "#c7ceff",
            "primary-light": "#dfe2fa",
            "primary-lighter": "rgba(110, 125, 222, 0.123)",
            "primary-lightest": "#f1f2f7",
            "primary-hov": "#6370c5",
            accent: "#f99c30",
            "accent-light": "#ffe6cc",
            "accent-hov": "#ffae52",
            neutral: "#b3b3b3",
            "neutral-light": "#ebebeb",
            "neutral-lighter": "#f5f5f5",
            tertiary: "hsla(200, 71%, 11%, 0.478)",
            "tertiary-light": "rgb(176, 195, 204)",
            "tertiary-lighter": "rgba(31, 56, 77, 0.151)",
         },
         spacing: {
            100: "28rem",
            104: "32rem",
            110: "38rem",
         },
      },
   },
   plugins: ["prettier-plugin-tailwindcss"],
};
