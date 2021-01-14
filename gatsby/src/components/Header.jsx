/* eslint-disable react/prop-types */

import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import tw, { css, theme } from "twin.macro";
import { AppContext } from "~context/AppContext.jsx";
import { DocumentContext } from "~context/DocumentContext.jsx";
import Grid from "~components/styles/Grid.jsx";
import * as Icon from "~components/svg/Icons.jsx";
import * as Logo from "~components/svg/Logos.jsx";
import * as T from "~components/styles/Typography.jsx";

const Header = () => {
  const { headerOpaque, setHeaderOpaque } = useContext(AppContext);
  const { isDesktop, screen, scrollTop } = useContext(DocumentContext);

  //

  let headerCSS = `
    background: transparent;
    color: ${headerOpaque ? theme`colors.black` : theme`colors.white`};
    border-color: ${headerOpaque ? theme`colors.black` : theme`colors.white`};
  `;

  if (isDesktop()) {
    headerCSS = `
      background: transparent;
      color: ${headerOpaque ? theme`colors.black` : theme`colors.white`};
      border-color: ${headerOpaque ? theme`colors.black` : theme`colors.white`};
    `;
  } else {
    headerCSS = `
      background: transparent;
      color: ${theme`colors.black`};
      border-color: ${theme`colors.black`};
    `;
  }

  //

  useEffect(() => {
    setHeaderOpaque(isDesktop() || scrollTop > 400);
  }, [scrollTop]);

  //

  return (
    <header
      css={[
        headerCSS,
        tw`transition-colors w-full h-12 fixed top-0 right-0 left-0 px-6 md:px-0 z-40 border-b`
      ]}
    >
      <Grid node="nav" styles={[tw`h-full`]}>
        <div tw="col-span-9 md:col-span-12 md:col-start-1 h-full relative flex items-center">
          <Link to="/">
            <Logo.Logomark styles={[tw`w-8 md:ml-6`]} />
          </Link>

          <T.Body font="3" styles={[tw`ml-2`]}>
            Everbrand is now Hereafter.
          </T.Body>
        </div>

        <div tw="col-span-3 md:col-span-12 h-full flex items-center justify-end md:pr-6">
          <T.Body font="3" styles={[tw`mr-2`]}>
            Cart
          </T.Body>

          <Icon.Cart color={theme`colors.black`} styles={[tw`w-6`]} />
        </div>
      </Grid>
    </header>
  );
};

export default Header;
