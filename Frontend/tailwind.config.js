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
      'third': '#A0A0A0',  
      'third-dark': '#557A8A',  
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
  plugins: [],
};
