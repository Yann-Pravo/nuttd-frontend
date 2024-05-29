/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      npurple: '#d33577',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
