/* eslint-disable import/prefer-default-export */

import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { DocumentContext } from "~context/DocumentContext.jsx";

const bodyStyles = {
  xs: [
    {
      fontFamily: `Signifier`,
      fontSize: 18,
      fontWeight: 200,
      lineHeight: `22px`
    },
    {
      fontFamily: `Signifier`,
      fontSize: 16,
      fontWeight: 200,
      lineHeight: `20px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Signifier`,
      fontSize: 12,
      fontWeight: 200,
      lineHeight: `16px`
    }
  ],
  sm: [
    {
      fontFamily: `Signifier`,
      fontSize: 18,
      fontWeight: 200,
      lineHeight: `22px`
    },
    {
      fontFamily: `Signifier`,
      fontSize: 16,
      fontWeight: 200,
      lineHeight: `20px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Signifier`,
      fontSize: 12,
      fontWeight: 200,
      lineHeight: `16px`
    }
  ],
  md: [
    {
      fontFamily: `Signifier`,
      fontSize: 22,
      fontWeight: 200,
      lineHeight: `26px`
    },
    {
      fontFamily: `Signifier`,
      fontSize: 16,
      fontWeight: 200,
      lineHeight: `20px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Signifier`,
      fontSize: 12,
      fontWeight: 200,
      lineHeight: `18px`,
      letterSpacing: `0.01em`
    }
  ]
};

const buttonStyles = {
  xs: {
    fontFamily: `Suisse Intl Mono`,
    fontSize: 12,
    lineHeight: `14px`
  },
  sm: {
    fontFamily: `Suisse Intl Mono`,
    fontSize: 12,
    lineHeight: `14px`
  },
  md: {
    fontFamily: `Suisse Intl Mono`,
    fontSize: 14,
    lineHeight: `18px`
  }
};

const captionStyles = {
  xs: {
    fontFamily: `Suisse Intl Mono`,
    fontSize: 10,
    lineHeight: `14px`
  },
  sm: {
    fontFamily: `Suisse Intl Mono`,
    fontSize: 10,
    lineHeight: `14px`
  },
  md: {
    fontFamily: `Suisse Intl Mono`,
    fontSize: 10,
    lineHeight: `14px`
  }
};

const headingStyles = {
  xs: [
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 66,
      fontWeight: 500,
      lineHeight: `70px`,
      letterSpacing: `0.03em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 44,
      fontWeight: 500,
      lineHeight: `48px`,
      letterSpacing: `0.04em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 30,
      fontWeight: 500,
      lineHeight: `34px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 22,
      fontWeight: 500,
      lineHeight: `26px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 18,
      fontWeight: 500,
      lineHeight: `22px`,
      letterSpacing: `0.01em`
    }
  ],
  sm: [
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 66,
      fontWeight: 500,
      lineHeight: `70px`,
      letterSpacing: `0.03em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 44,
      fontWeight: 500,
      lineHeight: `48px`,
      letterSpacing: `0.02em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 30,
      fontWeight: 500,
      lineHeight: `34px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 22,
      fontWeight: 500,
      lineHeight: `26px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 18,
      fontWeight: 500,
      lineHeight: `22px`,
      letterSpacing: `0.01em`
    }
  ],
  md: [
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 96,
      fontWeight: 500,
      lineHeight: `96px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 66,
      fontWeight: 500,
      lineHeight: `72px`,
      letterSpacing: `0.02em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 42,
      fontWeight: 500,
      lineHeight: `42px`,
      letterSpacing: `0.01em`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 30,
      fontWeight: 500,
      lineHeight: `34px`
    },
    {
      fontFamily: `Gerstner Programm FSL`,
      fontSize: 24,
      fontWeight: 500,
      lineHeight: `26px`
    }
  ]
};

/**
 * -----------------------------------------------------------------------------
 * Return the current device from the DocumentContext. Required to sanitise
 * desktop values, e.g. if md/lg/xl are the same, return md for all three.
 *
 * TODO : move this to DocumentContext
 *
 * @return {node}   Sanitised screen variable
 */

export const parseScreen = (screen) => {
  if (screen === `lg` || screen === `xl`) {
    screen = `md`;
  }

  return screen;
};

/**
 * -----------------------------------------------------------------------------
 * TODO : document
 */

export const Style = (key) => {
  const { screen } = useContext(DocumentContext);
  const parsedScreen = parseScreen(screen);

  if (key === `caption`) {
    return captionStyles?.[parsedScreen] || null;
  }

  if (key === `button`) {
    return buttonStyles?.[parsedScreen] || null;
  }

  if (key.includes(`b`)) {
    const adjustedKey = key.replace(`b`, ``);

    return bodyStyles?.[parsedScreen]?.[adjustedKey - 1] || null;
  }

  if (key.includes(`h`)) {
    const adjustedKey = key.replace(`h`, ``);

    return headingStyles?.[parsedScreen]?.[adjustedKey - 1] || null;
  }

  return null;
};

/**
 * -----------------------------------------------------------------------------
 * Receive a <p> (body) node from the style guide.
 * @param  {node}   children  Inner text
 * @param  {string} font      The font style (accepts 1, 2, 3)
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <p> node
 */

export const Body = ({ children, font, styles }) => {
  const { screen } = useContext(DocumentContext);

  const fontCSS = bodyStyles?.[parseScreen(screen)]?.[font - 1] || {};

  const css = {
    ...styles?.[0],
    ...fontCSS
  };

  return <p css={css}>{children}</p>;
};

Body.defaultProps = {
  font: `1`,
  styles: []
};
Body.propTypes = {
  children: PropTypes.node.isRequired,
  font: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.shape({}))
};

/**
 * -----------------------------------------------------------------------------
 * Receive a button-styled <?> node from the style guide.
 * @param  {node}   children  Inner text
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <?> node (defaults to <span>)
 */

export const Button = ({ children, nodeType, styles }) => {
  const { screen } = useContext(DocumentContext);

  const fontCSS = buttonStyles?.[parseScreen(screen)] || {};

  const css = {
    ...styles?.[0],
    ...fontCSS
  };

  const B = `${nodeType}`;

  return <B css={css}>{children}</B>;
};

Button.defaultProps = {
  nodeType: `span`,
  styles: []
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  nodeType: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.shape({}))
};

/**
 * -----------------------------------------------------------------------------
 * Receive a <p> (caption) node from the style guide.
 * @param  {node}   children  Inner text
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <p> node
 */

export const Caption = ({ children, styles }) => {
  const { screen } = useContext(DocumentContext);

  const fontCSS = captionStyles?.[parseScreen(screen)] || {};

  const css = {
    ...styles?.[0],
    ...fontCSS
  };

  return <p css={css}>{children}</p>;
};

Caption.defaultProps = {
  styles: []
};
Caption.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape({}))
};

/**
 * -----------------------------------------------------------------------------
 * Receive a h1-h6 node from the style guide. The type of node returned is
 * determined by the level supplied.
 * @param  {node}   children  Inner text
 * @param  {string} font      The font style (accepts 1, 2, 3, 4, b1, b2, b3)
 * @param  {string} level     The heading level (accepts 1, 2, 3, 4, 5, 6)
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <h?> node
 */

export const Heading = ({ children, font, level, styles }) => {
  const { screen } = useContext(DocumentContext);

  let fontCSS = headingStyles?.[parseScreen(screen)]?.[font - 1] || {};

  if (font.toString().includes(`b`)) {
    fontCSS =
      bodyStyles?.[parseScreen(screen)]?.[
        parseInt(font.toString().replace(`b`, ``)) - 1
      ] || {};
  }

  const css = {
    ...styles?.[0],
    ...fontCSS
  };

  const H = `h${level}`;

  return (
    <H aria-level={level} css={css}>
      {children}
    </H>
  );
};

Heading.defaultProps = {
  font: `1`,
  level: `2`,
  styles: []
};
Heading.propTypes = {
  children: PropTypes.node.isRequired,
  font: PropTypes.string,
  level: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.shape({}))
};
