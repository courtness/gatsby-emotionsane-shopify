/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import tw, { css } from "twin.macro";
import Grid from "~components/styles/Grid.jsx";
import * as T from "~components/styles/Typography.jsx";
import Layout from "~components/Layout.jsx";
import SEO from "~components/SEO.jsx";

const StyleGuidePage = ({ location }) => (
  <>
    <SEO noIndex />

    <Layout>
      <Grid node="section" styles={[tw`pt-24`]}>
        <ul
          style={{ borderBottom: `1px solid black` }}
          tw="col-span-22 col-start-2 pb-6"
        >
          {Array(4)
            .fill(null)
            .map((_, headingIndex) => {
              const key = `style-guide-heading-${headingIndex}`;

              return (
                <li key={key} tw="mt-6 mb-6">
                  <T.Heading
                    key={key}
                    font={headingIndex + 1}
                    level={headingIndex + 1}
                  >
                    {`h${headingIndex + 1}: Love + Money`}
                  </T.Heading>
                </li>
              );
            })}
        </ul>

        {/* // */}

        <ul
          css={[
            css`
              border-bottom: 1px solid black;
            `,
            tw`col-span-22 col-start-2 pb-6`
          ]}
        >
          {Array(3)
            .fill(null)
            .map((_, bodyIndex) => {
              const key = `style-guide-body-${bodyIndex}`;

              return (
                <li key={key} tw="mt-6 mb-6">
                  <T.Body key={key} font={bodyIndex + 1} level={bodyIndex + 1}>
                    {`b${bodyIndex + 1}: Love + Money`}
                  </T.Body>
                </li>
              );
            })}
        </ul>

        <div tw="col-span-22 col-start-2 pt-6">
          <T.Caption>Caption: Love + Money</T.Caption>
        </div>
      </Grid>
    </Layout>
  </>
);

export default StyleGuidePage;
