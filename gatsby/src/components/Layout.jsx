import React from "react";
import { css, Global } from "@emotion/react";
import PropTypes from "prop-types";
import * as Fonts from "~components/styles/Fonts";
import Nav from "~components/Nav";

const Layout = ({ children, styles }) => (
  <>
    <Global
      styles={css`
        ${Fonts.CSS()}
      `}
    />

    <Nav />

    <main id="layout" css={styles}>
      {children}
    </main>
  </>
);

Layout.defaultProps = {
  styles: []
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Layout;
