/* eslint-disable react/prop-types */

import React from "react";
import { graphql } from "gatsby";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import Footer from "~components/Footer.jsx";
import Layout from "~components/Layout.jsx";
import SEO from "~components/SEO.jsx";
import Grid from "~components/styles/Grid.jsx";
import * as T from "~components/styles/Typography.jsx";

const IndexPage = ({ data, location }) => {
  const cms = data.sanityIndex;

  //

  return (
    <>
      <SEO
        customTitle={cms.title || ``}
        customDescription={cms.seoDescription || ``}
        customKeywords={cms.seoKeywords || ``}
        path={location.pathname}
      />

      <Layout styles={[tw`pt-24`]}>
        <Grid node="section" styles={[tw`mt-6`]}>
          <div tw="col-span-12 px-3">
            <T.Heading font="2" level="1">{cms.title || `GSS`}</T.Heading>
          </div>
        </Grid>

        <Footer />
      </Layout>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPage {
    sanityIndex {
      title
    }

    allSanityProduct {
      edges {
        node {
          title
          handle
          image {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
            altText
          }
        }
      }
    }
  }
`;
