/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    // ... your project files, eg.:
    // './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './vueform.config.js', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js'
  ],
  theme: {
    boxShadow: {
      base: 'box-shadow: 4px 4px 0 0 #000',
      button: 'box-shadow: 4px 4px 0px currentColor',
      'button-hover': 'box-shadow: 4px 4px 0 0 rgba(0,0,0, .5'
    },
    extend: {
      fontFamily: {
        sans: ['Archivo', 'Helvetica', 'sans-serif']
      }
    }
  },
  plugins: [require('@vueform/vueform/tailwind')]
}
