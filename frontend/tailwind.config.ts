import { type Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Theme is now defined in globals.css using @theme directive
  // This config is kept for compatibility and content detection
} satisfies Config

