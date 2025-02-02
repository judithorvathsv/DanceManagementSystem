/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'main': '#242424',
      'prim' : '#f7bb9b',
      'third': '#A0A0A0',  
      'third-dark': '#787878',  
      'black' : '#000000',
      'prim-dark': '#D4887A',
      'success': '#7FB069',
      'success-dark': '#5C8C4D',
      'error': '#ff0000',
      'error-dark': '#D9534f',
    },
    extend: {      
      maxWidth: {
        '8xl': '100rem', 
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-out-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out'
      }
    },
    
  },
  plugins: [daisyui],
};
