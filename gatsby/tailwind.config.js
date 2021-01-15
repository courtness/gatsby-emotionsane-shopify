module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  plugins: [],
  purge: [
    `./components/**/*.{js,ts,jsx,tsx}`,
    `./pages/**/*.{js,ts,jsx,tsx}`,
    `./templates/**/*.{js,ts,jsx,tsx}`
  ],
  theme: {
    colors: {
      black: `#000000`,
      white: `#FFFFFF`
    },
    // extend: {
    // },
    screens: {
      sm: {
        min: `769px`
      },
      md: {
        min: `1025px`
      },
      lg: {
        min: `1441px`
      },
      xl: {
        min: `1921px`
      }
    }
  },
  variants: {}
};
