module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-primary)', 'sans-serif'],
      },
      colors: {
        navy: '#0d1b2a',
        'muted-green': '#1b5845',
      },
    },
  },
  plugins: [],
};
