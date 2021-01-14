import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { DocumentContext } from "~context/DocumentContext.jsx";

const ScreenHeight = ({ children, className }) => {
  const { windowHeight, windowWidth } = useContext(DocumentContext);

  // TODO : with Emotion

  useEffect(() => {
    if (typeof window === `undefined` || typeof document === `undefined`) {
      return;
    }

    document.documentElement.style.setProperty(
      `--vh`,
      `${windowHeight * 0.01}px`
    );
  }, [windowHeight, windowWidth]);

  //

  return (
    <section className={`screen-height ${className || ``}`}>{children}</section>
  );
};

ScreenHeight.defaultProps = {
  className: ``
};

ScreenHeight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ScreenHeight;
