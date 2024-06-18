/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx,js,jsx,}',
    './components/**/*.{ts,tsx,js,jsx,}',
    './app/**/*.{ts,tsx,js,jsx,}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          800: '#1d2939',
        },
        ash: {
          500: '#d3d3d3',
        },
        blue500: '#2e90fa',
        greenSuccess: '#4ac237',
        redError: '#b32318',
        spinGreenBg: '#CCE4CC',
        spinGreenInnerBg: '#193D1D',
        spinBg: '#202C26',
        spinRed: '#D9221F',
        spinGray: '#777777',
      },
    },
  },
  plugins: [],
};
