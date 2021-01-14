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
      water: `#168CB8`,
      grass: `#18543C`,
      violet: `#6237FF`,
      blossom: `#CAB6BB`,
      salt: `#F6F6FE`,
      geyser: `#D0D9E1`,
      ice: `#9CB6C4`,
      metal: `#54636A`,
      carbon: `#141414`,
      //
      black: `#010101`,
      "grey-dark": `#525252`,
      "grey-mid": `#9D9D9D`,
      "grey-pale": `#EBEBEB`,
      "anti-flash": `#f2f2f2`,
      white: `#FFFFFF`
    },
    extend: {
      gridColumn: {
        "span-13": `span 13 / span 13`,
        "span-14": `span 14 / span 14`,
        "span-15": `span 15 / span 15`,
        "span-16": `span 16 / span 16`,
        "span-17": `span 17 / span 17`,
        "span-18": `span 18 / span 18`,
        "span-19": `span 19 / span 19`,
        "span-20": `span 20 / span 20`,
        "span-21": `span 21 / span 21`,
        "span-22": `span 22 / span 22`,
        "span-23": `span 23 / span 23`,
        "span-24": `span 24 / span 24`
      },
      gridColumnStart: {
        13: `13`,
        14: `14`,
        15: `15`,
        16: `16`,
        17: `17`,
        18: `18`,
        19: `19`,
        20: `20`,
        21: `21`,
        22: `22`,
        23: `23`,
        24: `24`
      },
      gridTemplateColumns: {
        24: `repeat(24, minmax(0, 1fr))`
      }
    },
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
