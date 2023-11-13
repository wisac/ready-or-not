/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "dark": "#1F384C",
            "primary-dark": "#5A67BA",
            "secondary-dark": "#F99C30",
            
         },
      },
   },
   plugins: [],
};
