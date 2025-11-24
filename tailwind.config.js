/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'birthday-pink': '#FFB6C1',
        'birthday-purple': '#DDA0DD',
        'birthday-yellow': '#FFFACD',
      },
    },
  },
  plugins: [],
}

