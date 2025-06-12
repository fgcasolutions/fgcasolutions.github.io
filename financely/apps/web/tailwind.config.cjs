module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-primary)', 'sans-serif'],
      },
      colors: {
        navy: '#1b1a5a',
        'muted-green': '#1b5845',
      },
    },
  },
  plugins: [],
};
