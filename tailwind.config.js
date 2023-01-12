
module.exports = {
  content: ["./_site/**/*.{njk,md}", "./_site/**/*.svg",],
  theme: {
    fontFamily: {
      'sans': ['Rubik', 'Helvetica', 'Arial', 'sans-serif'],
      'display': ['Monoton'],
    },
    extend: {
      colors: {
        'primary': {
          light: '#e6edfd',
          DEFAULT: '#021034',
          dark: '#040b1c',
        },
        'secondary': {
          DEFAULT: '#16b3c0',
        },
      },
    },
  },
  plugins: [],
}
