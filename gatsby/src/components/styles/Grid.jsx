import React from "react";
import tw from "twin.macro";
import PropTypes from "prop-types";

/**
 * -----------------------------------------------------------------------------
 * This Tailwind config here should match the grid layout from design.
 */
const config = tw`grid grid-cols-12 md:grid-cols-24 gap-x-0 md:gap-x-0 relative`;

/**
 * -----------------------------------------------------------------------------
 * Receive a CSS grid wrapper to style guide spec.
 * @param  {node}   children  Inner JSX
 * @param  {string} node      Wrapper JSX node type (defaults to <div>)
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting CSS grid node
 */

const Grid = ({ children, node, styles }) => {
  const css = {
    ...config,
    ...styles?.[0]
  };

  const G = `${node}`;

  return <G css={css}>{children}</G>;
};

Grid.defaultProps = {
  node: `div`,
  styles: []
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Grid;
