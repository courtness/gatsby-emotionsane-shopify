/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { useContext } from "react";
import { graphql, Link } from "gatsby";
// eslint-disable-next-line no-unused-vars
import tw, { css, theme } from "twin.macro";
import Img from "gatsby-image";

import { DocumentContext } from "~context/DocumentContext.jsx";
import Button from "~components/Button.jsx";
import Footer from "~components/Footer.jsx";
import Layout from "~components/Layout.jsx";
import Newsletter from "~components/Newsletter.jsx";
import SEO from "~components/SEO.jsx";
import Grid from "~components/styles/Grid.jsx";
import * as T from "~components/styles/Typography.jsx";
import * as Logo from "~components/svg/Logos.jsx";

const IndexPage = ({ data, location }) => {
  const { isDesktop } = useContext(DocumentContext);

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

      <Layout styles={[tw`pt-24 md:pt-24 bg-ice`]}>
        <Grid node="section" styles={[tw`mt-6`]}>
          <div tw="col-span-12 md:col-span-22 md:col-start-2 px-3 md:px-0">
            <Logo.Wordmark styles={[tw`w-full`]} />
          </div>

          <figure tw="col-span-10 md:col-span-16 col-start-2 md:col-start-5 md:mt-20 mt-12 md:mb-16 mb-4">
            <Img
              fluid={cms.bannerImage.asset.fluid}
              alt={cms.bannerImage.altText}
            />
          </figure>
        </Grid>

        <Grid node="section" styles={[tw`items-center`]}>
          <T.Heading
            font="2"
            level="1"
            styles={[tw`col-span-20 mt-12 md:mt-0 md:pl-8 px-3 md:px-0`]}
          >
            {cms.heading}
          </T.Heading>

          <div tw="col-span-3 block mt-4 ml-3 md:ml-0 mb-12">
            <Logo.Logomark styles={[tw`w-16`]} />
          </div>
        </Grid>

        {(isDesktop() && (
          <Grid node="section" styles={[tw`mt-24`]}>
            {Array(4)
              .fill(null)
              .map((_, columnIndex) => {
                const key = `table-filler-upper-${columnIndex}`;

                return (
                  <div
                    key={key}
                    css={[
                      css`
                        height: 10rem;
                      `,
                      tw`col-span-3 flex flex-col items-stretch border-t border-r`
                    ]}
                  >
                    <div tw="h-full border-b" />
                    <div tw="h-full" />
                  </div>
                );
              })}

            <div tw="col-span-9 border-t border-r py-3 px-6">
              <T.Body font="1">{cms.content}</T.Body>
            </div>

            <div
              css={[
                css`
                  height: 10rem;
                `,
                tw`col-span-3 flex flex-col items-stretch border-t border-r`
              ]}
            >
              <div tw="h-full border-b" />
              <div tw="h-full" />
            </div>

            {/* // */}

            {Array(4)
              .fill(null)
              .map((_, columnIndex) => {
                const key = `table-filler-lower-${columnIndex}`;

                return (
                  <div
                    key={key}
                    css={[
                      css`
                        height: 10rem;
                      `,
                      tw`col-span-3 flex flex-col items-stretch border-t border-r`
                    ]}
                  >
                    <div tw="h-full border-b" />
                    <div tw="h-full" />
                  </div>
                );
              })}

            <ul tw="col-span-12 flex flex-wrap">
              {cms.attributes.map((attribute, attributeIndex) => {
                const key = `attribute-${attributeIndex}`;

                let icon;

                switch (attribute.toLowerCase()) {
                  case `activated carbon`:
                    icon = <Logo.Logomark styles={[tw`w-8`]} />;

                    break;

                  case `silver`:
                    icon = <Logo.Logomark styles={[tw`w-8`]} />;

                    break;

                  case `graphene`:
                    icon = <Logo.Logomark styles={[tw`w-8`]} />;

                    break;

                  case `silica`:
                    icon = <Logo.Logomark styles={[tw`w-8`]} />;

                    break;

                  default:
                    break;
                }

                return (
                  <li
                    key={key}
                    tw="w-1/2 relative flex items-center justify-between border-t border-r py-3 px-6"
                  >
                    <T.Heading font="5" level="3">
                      {attribute}
                    </T.Heading>
                    {icon}
                  </li>
                );
              })}
            </ul>
          </Grid>
        )) || (
          <section tw="w-full relative border-t">
            <T.Body font="1" styles={[tw`pt-4 px-3 pb-6`]}>
              {cms.content}
            </T.Body>

            <ul tw="flex flex-wrap">
              {cms.attributes.map((attribute, attributeIndex) => {
                const key = `attribute-${attributeIndex}`;

                let icon;

                switch (attribute.toLowerCase()) {
                  case `activated carbon`:
                    icon = <Logo.Logomark styles={[tw`w-6`]} />;

                    break;

                  case `silver`:
                    icon = <Logo.Logomark styles={[tw`w-6`]} />;

                    break;

                  case `graphene`:
                    icon = <Logo.Logomark styles={[tw`w-6`]} />;

                    break;

                  case `silica`:
                    icon = <Logo.Logomark styles={[tw`w-6`]} />;

                    break;

                  default:
                    break;
                }

                return (
                  <li
                    key={key}
                    tw="w-1/2 relative flex items-center justify-between border-t border-r pt-6 px-3 pb-6"
                  >
                    <T.Heading font="5" level="3">
                      {attribute}
                    </T.Heading>
                    {icon}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <Grid node="section" styles={[tw`border-t bg-white`]}>
          <T.Heading
            font="3"
            level="2"
            styles={[
              tw`col-span-12 md:col-span-24 pt-4 md:pt-6 pb-10 pl-3 md:pl-8 border-b`
            ]}
          >
            {cms.productsHeading}
          </T.Heading>

          {cms.products.map((product, productIndex) => {
            let price = ``;

            if (product?.shopifyProduct?.variants?.[0]?.price) {
              price = `–${product.shopifyProduct.variants[0].price}`;
            }

            const textJSX = (
              <>
                <T.Heading font="4" level="3">
                  {product.title}
                  {price}
                </T.Heading>

                <T.Heading font="b2" level="4" styles={[tw`mt-3`]}>
                  Your new favorite legging. Ultrasoft, slick, &amp; slightly
                  compressive.
                </T.Heading>
              </>
            );

            //

            return (
              <article
                key={product.handle}
                css={[
                  css`
                    border-right: 1px solid
                      ${productIndex % 2 === 0 ? `black` : `transparent`};
                  `,
                  tw`col-span-12 border-b`
                ]}
              >
                <div
                  css={[
                    css`
                      padding-bottom: 90%;
                    `,
                    tw`w-full relative block`
                  ]}
                >
                  <figure tw="w-full h-full absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                    <Img
                      tw="w-full h-full object-cover"
                      fluid={product.image.asset.fluid}
                      alt={product.title}
                    />
                  </figure>
                </div>

                <div tw="w-full relative flex border-t border-b">
                  {(isDesktop() && (
                    <header tw="w-full relative pt-3 md:pt-6 pr-3 md:pr-24 pb-4 md:pb-6 pl-3 md:pl-4">
                      {textJSX}
                    </header>
                  )) || (
                    <Link
                      to={`/products/${product.handle}`}
                      tw="w-full relative pt-3 md:pt-6 pr-3 md:pr-24 pb-4 md:pb-6 pl-3 md:pl-4"
                    >
                      {textJSX}
                    </Link>
                  )}

                  {isDesktop() && (
                    <Link to={`/products/${product.handle}`} tw="block">
                      <Button
                        styles={[tw`w-48 h-full block px-4 bg-white border-l`]}
                        text="Shop now"
                      />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </Grid>

        <Newsletter
          background={cms.newsletterImage}
          backgroundXS={cms.newsletterImageXS}
          content={cms.newsletterContent}
          heading={cms.newsletterHeading}
        />

        <Grid node="section" styles={[tw`text-white`]}>
          <figure tw="w-full h-full absolute top-0 right-0 bottom-0 left-0">
            <Img
              tw="w-full h-full relative object-cover"
              fluid={cms.hereBackground.asset.fluid}
              alt={cms.hereBackground.altText}
            />
          </figure>

          <div tw="col-span-12 md:col-span-24 h-48 md:h-64 relative z-10 pt-8 px-3 md:px-4 border-white border-t border-b">
            <T.Heading font="1" level="2">
              For
            </T.Heading>
          </div>

          <div tw="col-span-12 h-48 md:h-64 relative z-10 pt-8 px-3 md:px-4">
            <T.Heading font="1" level="2">
              Here
            </T.Heading>
          </div>

          <div tw="col-span-12 md:col-span-8 relative z-10 pt-4 px-3 md:px-4 pb-20 md:pb-0 border-white border-t md:border-none">
            <div
              css={[T.Style(`b2`), tw`whitespace-pre-wrap`]}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: cms.hereContent }}
            />
          </div>
        </Grid>

        <Grid node="section" styles={[tw`text-white`]}>
          <figure tw="w-full h-full absolute top-0 right-0 bottom-0 left-0">
            <Img
              tw="w-full h-full relative object-cover"
              fluid={cms.afterBackground.asset.fluid}
              alt={cms.afterBackground.altText}
            />
          </figure>

          <div tw="col-span-12 md:col-span-24 h-48 md:h-64 relative z-10 pt-8 px-3 md:px-4 border-white border-t border-b">
            <T.Heading font="1" level="2">
              For
            </T.Heading>
          </div>

          <div tw="col-span-12 h-48 md:h-64 relative z-10 pt-8 px-3 md:px-4">
            <T.Heading font="1" level="2">
              After
            </T.Heading>
          </div>

          <div tw="col-span-12 md:col-span-10 relative z-10 pt-4 px-3 md:px-4 pb-20 md:pb-0 border-white border-t md:border-none">
            <div
              css={[T.Style(`b2`), tw`whitespace-pre-wrap`]}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: cms.afterContent }}
            />
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
      bannerImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        altText
      }
      heading
      content
      attributes
      productsHeading
      products {
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

        shopifyProduct {
          id
          variants {
            price
          }
        }
      }

      newsletterHeading
      newsletterContent
      newsletterImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        altText
      }
      newsletterImageXS {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        altText
      }

      hereContent
      hereBackground {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        altText
      }

      afterContent
      afterBackground {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        altText
      }
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
