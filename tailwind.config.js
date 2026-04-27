/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: '#FFFFFF',
        foreground: '#000000',
        muted: '#6F6F6F',
        gold: {
          DEFAULT: '#c8a96a',
          hover: '#b5975d', // Slightly darker for hover states
          light: '#d4bc8a', // Slightly lighter for subtle highlights
        },
      },
    },
  },
  plugins: [],
}
