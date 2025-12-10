const config = {
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#1A2A40",
          light: "#243448",
          dark: "#0D1A2A",
        },
        copper: {
          DEFAULT: "#C67D4E",
          light: "#D4A574",
          dark: "#B8714A",
        },
        cream: "#FAF8F5",
        "warm-gray": "#F0EBE5",
        "body-gray": "#3D4F63",
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

module.exports = config