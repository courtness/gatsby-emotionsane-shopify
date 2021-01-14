/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import "lazysizes";

import React from "react";
import AppProvider from "~context/AppContext";
import CursorProvider from "~context/CursorContext";
import DocumentProvider from "~context/DocumentContext";
import Header from "~components/Header";

import "./src/assets/css/tailwind.build.css";

export const wrapRootElement = ({ element }) => (
  <>
    <DocumentProvider>
      <CursorProvider>
        <AppProvider>
          <Header />

          {element}
        </AppProvider>
      </CursorProvider>
    </DocumentProvider>
  </>
);
