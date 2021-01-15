/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import tw, { css, theme } from "twin.macro";
import { graphql } from "gatsby";
// import Img from "gatsby-image";
import { AppContext } from "~context/AppContext.jsx";
// import { DocumentContext } from "~context/DocumentContext.jsx";
import Grid from "~components/styles/Grid.jsx";
import * as T from "~components/styles/Typography.jsx";
import * as Icon from "~components/svg/Icons.jsx";
// import Carousel from "~components/Carousel.jsx";
import Footer from "~components/Footer.jsx";
import Layout from "~components/Layout.jsx";
import SEO from "~components/SEO.jsx";
import { trigger } from "~utils/analytics";
import { getVariantByOptions, getSelectableOptions } from "~utils/shopify";

/**
 * ProductPage
 * @component
 */
const ProductPage = ({ data, location }) => {
  const { addToCart } = useContext(AppContext);
  // const { isDesktop } = useContext(DocumentContext);

  const [cartProduct, setCartProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //

  const cms = data.sanityProduct;
  const options = getSelectableOptions(cms.shopifyProduct);
  const colorOptions = options?.Color;
  const sizeOptions = options?.Size;

  const selectOption = (key, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [key]: value
    });
  };

  //

  /**
   * ---------------------------------------------------------------------------
   * useEffect []
   * Loads on page render and sets a default variant based on the first set
   * of available selectable Shopify options.
   */
  useEffect(() => {
    const defaultOptions = {};

    Object.keys(options).forEach((optionKey) => {
      defaultOptions[optionKey] = options[optionKey]?.[0];
    });

    setSelectedOptions(defaultOptions);
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * useEffect [selectedOptions]
   * Executes every time a user changes a selectable option. This will create
   * a cartProduct, which contains the cartProduct.variant object required for
   * checkout.
   */
  useEffect(() => {
    setCartProduct({
      ...cms.shopifyProduct,
      variant: getVariantByOptions(cms.shopifyProduct, selectedOptions),
      variants: null
    });
  }, [selectedOptions]);

  /**
   * ---------------------------------------------------------------------------
   * [useEffect] cartProduct
   * Executes whenever the cartProduct is set. Useful for adding analytics
   * methods or additional hooks that fire on a user selecting a product.
   */
  useEffect(() => {
    if (!cartProduct) {
      return;
    }

    trigger(`productView`, cartProduct);
  }, [cartProduct]);

  //

  return (
    <>
      <SEO
        customTitle={cms.title}
        customDescription={cms.seoDescription}
        customKeywords={cms.seoKeywords}
        path={location.pathname}
      />

      <Layout styles={[tw`overflow-x-hidden`]}>
        <Grid node="section" styles={[tw`border-t`]}>
          <article tw="col-span-12">
            <header tw="pt-4 px-3 pb-4">
              <T.Heading font="4" level="1">
                {cms.title}
              </T.Heading>

              {cms?.shopifyProduct?.variants?.[0] && (
                <T.Heading font="4" level="2">
                  {`$${cms.shopifyProduct.variants[0].price}`}
                </T.Heading>
              )}
            </header>
          </article>
        </Grid>

        <Grid node="section" styles={[tw`mt-2`]}>
          <article tw="col-span-12 px-3">
            <div tw="col-span-12 pt-2 pb-2">
              <T.Body
                font="1"
                styles={[tw`whitespace-pre-wrap`]}
              >{`${cms.description}`}</T.Body>
            </div>
          </article>
        </Grid>

        <section tw="w-full relative block border-t mt-12 pb-2">
          {colorOptions?.[0] && (
            <Grid node="article" styles={[tw`mt-8`]}>
              <header tw="col-span-12">
                <T.Heading font="b1" level="3" styles={[tw`mb-4`]}>
                  Select Color:
                </T.Heading>
              </header>

              {colorOptions.map((color) => {
                const selected = selectedOptions?.Color === color;

                const buttonCSS = css`
                  background: ${selected
                    ? theme`colors.black`
                    : theme`colors.white`};
                  color: ${selected
                    ? theme`colors.white`
                    : theme`colors.black`};
                `;

                return (
                  <div key={color} tw="col-span-2">
                    <button
                      key={color}
                      type="button"
                      css={[
                        buttonCSS,
                        tw`w-10 h-10 relative block mr-6 rounded-full border overflow-hidden`
                      ]}
                      onClick={() => selectOption(`Color`, color)}
                    >
                      <T.Caption>{color}</T.Caption>
                    </button>
                  </div>
                );
              })}
            </Grid>
          )}

          {sizeOptions?.[0] && (
            <Grid node="article" styles={[tw`mt-8`]}>
              <header tw="col-span-12 relative flex items-center justify-between mb-2">
                <T.Heading font="b1" level="3">
                  Select Size:
                </T.Heading>
              </header>

              <T.Caption styles={[tw`col-span-12 mb-4`]}>
                {cms.sizeChartSubheading}
              </T.Caption>

              {sizeOptions.map((size) => {
                const selected = selectedOptions?.Size === size;

                const buttonCSS = css`
                  background: ${selected
                    ? theme`colors.black`
                    : theme`colors.white`};
                  color: ${selected
                    ? theme`colors.white`
                    : theme`colors.black`};
                `;

                return (
                  <button
                    key={size}
                    type="button"
                    css={[
                      buttonCSS,
                      tw`col-span-3 mb-1 pt-2 pr-2 pl-2 pb-8 text-left`
                    ]}
                    onClick={() => selectOption(`Size`, size)}
                  >
                    <T.Caption>{size}</T.Caption>
                  </button>
                );
              })}
            </Grid>
          )}

          <Grid>
            <button
              type="button"
              tw="col-span-12 relative block mt-8 pt-5 pr-4 pb-5 pl-4 bg-black text-left text-white uppercase"
              onClick={() => addToCart(cartProduct)}
            >
              <div tw="w-full flex items-center justify-between">
                <T.Button>Add To Cart</T.Button>
                <Icon.Arrow color="white" styles={[tw`h-4`]} />
              </div>
            </button>
          </Grid>
        </section>

        <Footer />
      </Layout>
    </>
  );
};

export default ProductPage;

export const query = graphql`
  query ProductPage($id: String!) {
    sanityProduct(id: { eq: $id }) {
      title
      handle
      priority
      description

      shopifyProduct {
        id
        handle
        title
        description
        images {
          originalSrc
        }
        productType
        vendor
        variants {
          id
          sku
          title
          image {
            originalSrc
          }
          price
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;




// accordion {
//   title
//   content
// }

// image {
//   asset {
//     fluid {
//       ...GatsbySanityImageFluid
//     }
//   }
//   altText
// }
// gallery {
//   asset {
//     fluid {
//       ...GatsbySanityImageFluid
//     }
//   }
//   altText
// }
// sections {
//   ... on SanityGallery {
//     gallery {
//       asset {
//         fluid {
//           ...GatsbySanityImageFluid
//         }
//       }
//       altText
//     }
//   }
//   ... on SanityReviews {
//     reviews {
//       name
//       location
//       date
//       rating
//       title
//       content
//     }
//   }
//   ... on SanitySimpleText {
//     heading
//     content
//   }
// }

// related {
//   shopifyProduct {
//     id
//     handle
//     title
//     description
//     images {
//       originalSrc
//     }
//     productType
//     vendor
//     variants {
//       id
//       sku
//       title
//       image {
//         originalSrc
//       }
//       price
//       selectedOptions {
//         name
//         value
//       }
//     }
//   }
// }