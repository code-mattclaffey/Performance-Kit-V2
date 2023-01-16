module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: { config: './tailwind.config.js' },
    autoprefixer: {},
    'postcss-preset-env': {
      "features": {
        "custom-properties": {
          "disableDeprecationNotice": true
        }
      },
      "autoprefixer": {
        "grid": true
      },
      "preserve": true,
      "stage": 2,
      "importFrom": {
        "customMedia": {
          "--xs": "(min-width: 375px)",
          "--s": "(min-width: 481px)",
          "--m": "(min-width: 640px)",
          "--m-max": "(max-width: 640px)",
          "--l": "(min-width: 769px)",
          "--l-max": "(max-width: 768px)",
          "--xl": "(min-width: 941px)",
          "--xxl": "(min-width: 1180px)"
        }
      }
    },
    cssnano: {},
  },
};
