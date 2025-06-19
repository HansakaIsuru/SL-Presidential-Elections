/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f43f5e',     // Rose
        secondary: '#ec4899',   // Pink
        accent: '#c084fc',      // Light Purple
        background: '#fdf2f8',  // Soft Pink Background
        textPrimary: '#be185d', // Deep Rose for text
      },
    },
  },
  plugins: [],
};
