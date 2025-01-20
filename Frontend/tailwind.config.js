/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'prim' : '#f7bb9b',
      'sec' : '#FDF0D5',
      'third' : '#D3D3D3',  
      'black' : '#000000',
      'prim-dark': '#E5A989',
    },
    extend: {},
  },
  plugins: [],
};
