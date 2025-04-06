/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'custom-xs': ['0.75rem', '1.9'],
        'custom-sm': ['0.875rem', '1.9'],
        'custom-base': ['1rem', '1.9'],
        'custom-lg': ['1.125rem', '1.5'],
        'custom-xl': ['1.25rem', '1.5'],
        'custom-2xl': ['1.5rem', '1.5'],
        'custom-3xl': ['1.875rem', '1.5'],
      },
    },
  },
  plugins: [],
};
