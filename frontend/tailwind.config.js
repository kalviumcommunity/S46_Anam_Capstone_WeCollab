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
        "thumbnail": "url(./Thumbnail.svg)",
        "wavy" : "url(./wavy-bgm.png)"
      }
    },
  },
  plugins: [],
}
