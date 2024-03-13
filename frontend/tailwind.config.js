/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "space": ["Space Mono", "monospace"],
        "raleway": ["Raleway", "sans-serif"],
        "Poppins": ["Poppins", "sans-serif"]
      },
      backgroundImage: {
        "thumbnail": "url(./src/assets/Thumbnail.svg)",
        "wavy" : "url(./src/assets/wavy-bgm.png)"
      }
    },
  },
  plugins: [],
}