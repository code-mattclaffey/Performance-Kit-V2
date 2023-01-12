module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
    'postcss-preset-env': {
      features: {
        'custom-properties': {
          disableDeprecationNotice: true
        }
      },
      autoprefixer: {
        grid: true
      },
      preserve: true,
      stage: 3,
      importFrom: {
        customMedia: {
          '--xs': '(min-width: 375px)',
          '--s': '(min-width: 481px)',
          '--m': '(min-width: 640px)',
          '--l': '(min-width: 769px)',
          '--xl': '(min-width: 941px)',
          '--xxl': '(min-width: 1180px)'
        }
      }
    }
  },
};
