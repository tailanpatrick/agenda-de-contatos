/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other Tailwind CSS configuration options ...
  content: [
    './src/**/*.{html,js,jsx,tsx,ejs}', // Scan files in the `src` directory for CSS classes
    './node_modules/tailwindcss/**/*.css', // Scan Tailwind CSS base styles
  ],
};