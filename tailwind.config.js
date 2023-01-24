module.exports = {
  content: ['./_site/**/*.{njk,md,js}', './_site/**/*.svg'],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'Helvetica', 'Arial', 'sans-serif'],
      display: ['Monoton'],
    },
    extend: {
      colors: {
        primary: {
          light: '#e6edfd',
          DEFAULT: '#021034',
          dark: '#040b1c',
          hover: '#4f5872',
        },
        secondary: {
          DEFAULT: '#16b3c0',
          hover: '#ced5e4',
        },
      },
    },
  },
  plugins: [],
};
