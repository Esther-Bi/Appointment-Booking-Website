/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#8FBC8F",
        'headerBG':"#fef5f0"
      }
    },
  },
  plugins: [],
}