module.exports = {
  purge: {
    enabled: false,
    content: [
      `./sections/*.liquid`,
      `./snippets/*.liquid`,
      `./layout/*.liquid`,
      `./templates/*.liquid`
    ]
  },
  theme: {
    colors: {
      white: `#ffffff`,
      black: `#000000`
    },
    screens: {
      sm: {
        min: `768px`
      },
      md: {
        min: `1024px`
      },
      lg: {
        min: `1440px`
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
