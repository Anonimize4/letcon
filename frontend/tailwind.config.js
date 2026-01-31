/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HackTheBox color scheme
        'htb-background': '#1a2332',
        'htb-foreground': '#a4b1cd',
        'htb-black': '#000000',
        'htb-bright-black': '#666666',
        'htb-white': '#ffffff',
        'htb-bright-white': '#ffffff',
        'htb-red': '#ff3e3e',
        'htb-bright-red': '#ff8484',
        'htb-green': '#9fef00',
        'htb-bright-green': '#c5f467',
        'htb-yellow': '#ffaf00',
        'htb-bright-yellow': '#ffcc5c',
        'htb-gold': '#ffd700',
        'htb-bright-gold': '#ffed4e',
        'htb-blue': '#004cff',
        'htb-bright-blue': '#5cb2ff',
        'htb-purple': '#9f00ff',
        'htb-bright-purple': '#c16cfa',
        'htb-cyan': '#2ee7b6',
        'htb-bright-cyan': '#5cecc6',
        'htb-selection-background': '#313f55',
        'htb-cursor-color': '#313f55',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
