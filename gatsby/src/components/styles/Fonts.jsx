import gerstnerMediumEot from "~assets/fonts/gerstner-programm-fsl-medium.eot";
import gerstnerMediumSvg from "~assets/fonts/gerstner-programm-fsl-medium.svg";
import gerstnerMediumTtf from "~assets/fonts/gerstner-programm-fsl-medium.ttf";
import gerstnerMediumWoff from "~assets/fonts/gerstner-programm-fsl-medium.woff";
import signifierLightEot from "~assets/fonts/signifier-light.eot";
import signifierLightSvg from "~assets/fonts/signifier-light.svg";
import signifierLightTtf from "~assets/fonts/signifier-light.ttf";
import signifierLightWoff from "~assets/fonts/signifier-light.woff";
import signifierLightItalicEot from "~assets/fonts/signifier-light-italic.eot";
import signifierLightItalicSvg from "~assets/fonts/signifier-light-italic.svg";
import signifierLightItalicTtf from "~assets/fonts/signifier-light-italic.ttf";
import signifierLightItalicWoff from "~assets/fonts/signifier-light-italic.woff";
import suisseRegularEot from "~assets/fonts/suisse-intl-mono-regular.eot";
import suisseRegularSvg from "~assets/fonts/suisse-intl-mono-regular.svg";
import suisseRegularTtf from "~assets/fonts/suisse-intl-mono-regular.ttf";
import suisseRegularWoff from "~assets/fonts/suisse-intl-mono-regular.woff";

/**
 * -----------------------------------------------------------------------------
 * The core fonts object here determines @font-faces fed to the automatic CSS
 * generator that runs below.
 *
 * Valid weights:
 * 100: Thin, Hairline, Ultra-light, Extra-light
 * 200: Light
 * 300: Book
 * 400: Regular, Normal, Plain, Roman, Standard
 * 500: Medium
 * 600: Semi-bold, Demi-bold
 * 700: Bold
 * 800: Heavy, Black, Extra-bold
 * 900: Ultra-black, Extra-black, Ultra-bold, Heavy-black, Fat, Poster
 *
 * Entries should take the form:
 * [name]: {
 *   [weight]: {
 *     [style]: {
 *       [format]: [file]
 *     }
 *   }
 * }
 *
 * For example:
 * "Helvetica Neue": {
 *   400: {
 *     normal: {
 *       woff: importedHelveticaWoff,
 *       ttf: importedHelveticaTtf,
 *       ...
 *     }
 *   }
 * }
 */
export const fonts = {
  "Gerstner Programm FSL": {
    500: {
      normal: {
        eot: gerstnerMediumEot,
        woff: gerstnerMediumWoff,
        ttf: gerstnerMediumTtf,
        svg: gerstnerMediumSvg
      }
    }
  },
  Signifier: {
    200: {
      normal: {
        eot: signifierLightEot,
        woff: signifierLightWoff,
        ttf: signifierLightTtf,
        svg: signifierLightSvg
      },
      italic: {
        eot: signifierLightItalicEot,
        woff: signifierLightItalicWoff,
        ttf: signifierLightItalicTtf,
        svg: signifierLightItalicSvg
      }
    }
  },
  "Suisse Intl Mono": {
    400: {
      normal: {
        eot: suisseRegularEot,
        woff: suisseRegularWoff,
        ttf: suisseRegularTtf,
        svg: suisseRegularSvg
      }
    }
  }
};

/**
 * -----------------------------------------------------------------------------
 * Generate a CSS-compatible string with @font-faces built from the fonts object
 * defined above. This method should not be modified.
 * @return {string} Computed @font-face CSS.
 */
export const CSS = () => {
  let fontCSS = ``;

  Object.keys(fonts).forEach((fontFamily) => {
    const font = fonts[fontFamily];
    const weights = Object.keys(font);

    weights.forEach((weight) => {
      const styles = Object.keys(font[weight]);

      styles.forEach((style) => {
        const formats = Object.keys(font[weight][style]);

        let fontURLs = ``;

        formats.forEach((format, formatIndex) => {
          const file = font[weight][style][format];

          if (format === `eot`) {
            fontURLs += `src: url(${file}#iefix);`;
          }

          const fileFormat = format === `eot` ? `embedded-opentype` : format;
          const fileHash =
            format === `svg`
              ? `#${fontFamily.toLowerCase().replace(/\s/g, ``)}` // TODO : sanitise properly
              : ``;
          const prefix = formatIndex === 0 ? `src: ` : `     `;
          const suffix = formatIndex < formats.length - 1 ? `,` : `;`;

          fontURLs += `
  ${prefix}url(${file}${fileHash}) format("${fileFormat}")${suffix}`;
        });

        fontCSS += `

@font-face {
  font-family: "${fontFamily}";
  font-style: ${style};
  font-weight: ${weight};
  ${fontURLs}
}`;
      });
    });
  });

  return fontCSS;
};
