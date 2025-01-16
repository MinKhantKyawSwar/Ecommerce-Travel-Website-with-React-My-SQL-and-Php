/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), 
    require('@butterfail/tailwindcss-inverted-radius'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for IE, Edge, and modern browsers */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none',   /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',             /* Chrome, Safari, and Opera */
        },
      });
    },
  ]
}