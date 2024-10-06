/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of your template files
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths as needed
    './public/index.html',
  ],
  theme: {
    extend: {
      // You can customize your theme here
      colors: {
        primary: '#3490dc', // Example primary color
        secondary: '#ffed4a', // Example secondary color
        // Add more custom colors as needed
      },
      // Extend the theme with custom spacing, fonts, etc. as needed
    },
  },
  plugins: [],
};


