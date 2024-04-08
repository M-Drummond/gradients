/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    boxShadow:{
      base: "box-shadow: 4px 4px 0 0 #000"
    },
    extend: {
      fontFamily:{
        sans: [ 'Archivo', 'Helvetica' , 'sans-serif']
      }
    },
  },
  plugins: [],
}

