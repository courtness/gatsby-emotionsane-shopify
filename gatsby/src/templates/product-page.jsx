/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import tw, { css, theme } from "twin.macro";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { AppContext } from "~context/AppContext.jsx";
import { DocumentContext } from "~context/DocumentContext.jsx";
import Grid from "~components/styles/Grid.jsx";
import * as T from "~components/styles/Typography.jsx";
import * as Icon from "~components/svg/Icons.jsx";
import Carousel from "~components/Carousel.jsx";
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
  const { isDesktop } = useContext(DocumentContext);

  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [cartProduct, setCartProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //

  const cms = data.sanityProduct;
  const options = getSelectableOptions(cms.shopifyProduct);
  const colorOptions = options?.Color;
  const lengthOptions = options?.Length;
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
        {(!isDesktop() && (
          <>
            <section
              css={[
                css`
                  width: calc(100% + 24px);
                  margin-left: -24px;
                  height: 150vw;
                `,
                tw`relative`
              ]}
            >
              <Carousel
                keyPrefix="pdp-gallery"
                peek={24}
                styles={[tw`h-full`]}
                items={cms.gallery.map((galleryItem, galleryItemIndex) => {
                  const key = `gallery-item-${galleryItemIndex}`;

                  return (
                    <figure key={key} tw="w-full h-full">
                      <Img
                        tw="w-full h-full object-cover"
                        fluid={galleryItem.asset.fluid}
                        alt={galleryItem.altText}
                      />
                    </figure>
                  );
                })}
              />
            </section>

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

            <Grid node="article" styles={[tw`border-t border-b border-black`]}>
              <div tw="col-span-12 mt-4 mb-4 px-3 flex items-center justify-between">
                <ul tw="flex">
                  {Array(5)
                    .fill(null)
                    .map((_, starIndex) => {
                      const key = `star-${starIndex}`;

                      return (
                        <li key={key}>
                          <Icon.Star
                            color="black"
                            styles={[
                              css`
                                height: 14px;
                                margin-right: 2px;
                                margin-top: -4px;
                              `
                            ]}
                          />
                        </li>
                      );
                    })}
                </ul>

                <T.Caption styles={[tw`uppercase`]}>(0) reviews</T.Caption>
              </div>
            </Grid>

            <ul tw="flex border-b border-black">
              <li tw="w-1/4 h-16 relative flex items-center justify-center border-r">
                <Icon.Triangle color="black" styles={[tw`h-8`]} />
              </li>

              <li tw="w-1/4 h-16 relative flex items-center justify-center border-r">
                <Icon.Triangle color="black" styles={[tw`h-8`]} />
              </li>

              <li tw="w-1/4 h-16 relative flex items-center justify-center border-r">
                <Icon.Triangle color="black" styles={[tw`h-8`]} />
              </li>

              <li tw="w-1/4 h-16 relative flex items-center justify-center">
                <Icon.Triangle color="black" styles={[tw`h-8`]} />
              </li>
            </ul>

            <Grid node="section" styles={[tw`mt-2`]}>
              <article tw="col-span-12 px-3">
                <div tw="col-span-12 pt-2 pb-2">
                  <T.Body
                    font="1"
                    styles={[tw`whitespace-pre-wrap`]}
                  >{`${cms.description}`}</T.Body>
                </div>

                <div tw="col-span-12 pt-2 pb-2 italic">
                  <T.Body font="1">{`${cms.designedFor}`}</T.Body>
                </div>
              </article>
            </Grid>

            <Grid node="section">
              {cms?.features?.[0] && (
                <article tw="col-span-12 mt-8 px-3 overflow-x-hidden">
                  <header>
                    <T.Heading font="b1" level="3" styles={[tw`italic`]}>
                      Features
                    </T.Heading>
                  </header>

                  <ul tw="w-full relative list-disc list-outside ml-5 mt-4 whitespace-pre-wrap">
                    {cms.features.map((feature, featureIndex) => {
                      const key = `feature-${featureIndex}`;

                      return (
                        <li key={key} css={[T.Style(`b1`), tw`mr-5`]}>
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              )}
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
                        ? theme`colors.carbon`
                        : theme`colors.salt`};
                      color: ${selected
                        ? theme`colors.white`
                        : theme`colors.carbon`};
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
                    <T.Button nodeType="h3" styles={[tw`underline`]}>
                      Size guide
                    </T.Button>
                  </header>

                  <T.Caption styles={[tw`col-span-12 mb-4`]}>
                    {cms.sizeChartSubheading}
                  </T.Caption>

                  {sizeOptions.map((size) => {
                    const selected = selectedOptions?.Size === size;

                    const buttonCSS = css`
                      background: ${selected
                        ? theme`colors.carbon`
                        : theme`colors.salt`};
                      color: ${selected
                        ? theme`colors.white`
                        : theme`colors.carbon`};
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

              {lengthOptions?.[0] && (
                <Grid node="article" styles={[tw`mt-8`]}>
                  <header tw="col-span-12">
                    <T.Heading font="b1" level="3" styles={[tw`mb-4`]}>
                      Select Length:
                    </T.Heading>
                  </header>

                  {lengthOptions.map((length) => {
                    const selected = selectedOptions?.Length === length;

                    const buttonCSS = css`
                      background: ${selected
                        ? theme`colors.carbon`
                        : theme`colors.salt`};
                      color: ${selected
                        ? theme`colors.white`
                        : theme`colors.carbon`};
                    `;

                    return (
                      <button
                        key={length}
                        type="button"
                        css={[
                          buttonCSS,
                          tw`col-span-6 block pt-2 pr-2 pb-8 pl-2 text-left`
                        ]}
                        onClick={() => selectOption(`Length`, length)}
                      >
                        <T.Caption>{length}</T.Caption>
                      </button>
                    );
                  })}
                </Grid>
              )}

              <Grid>
                <button
                  type="button"
                  tw="col-span-12 relative block mt-8 pt-5 pr-4 pb-5 pl-4 bg-violet text-white text-left uppercase"
                  onClick={() => addToCart(cartProduct)}
                >
                  <div tw="w-full flex items-center justify-between">
                    <T.Button>Add To Cart</T.Button>
                    <Icon.Arrow color="white" styles={[tw`h-4`]} />
                  </div>
                </button>
              </Grid>
            </section>

            {/* accordion */}

            {cms?.accordion?.[0] && (
              <Grid node="section" styles={[tw`mt-6 mb-8`]}>
                <ul tw="col-span-12 border-t border-r border-l">
                  {cms.accordion.map((accordion, accordionIndex) => (
                    <li key={accordion.title} tw="col-span-12 border-b">
                      <button
                        type="button"
                        tw="w-full relative block pt-4 pr-3 pb-6 pl-3"
                        onClick={() =>
                          setExpandedAccordion(
                            expandedAccordion === accordionIndex
                              ? null
                              : accordionIndex
                          )
                        }
                      >
                        <div tw="w-full flex justify-between">
                          <T.Body>{accordion.title}</T.Body>
                          <T.Caption styles={[tw`uppercase`]}>More +</T.Caption>
                        </div>

                        {expandedAccordion === accordionIndex && (
                          <T.Body styles={[tw`mt-6 text-left`]}>
                            {accordion.content}
                          </T.Body>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </Grid>
            )}

            {/* sections */}

            {cms?.sections?.[0] &&
              cms.sections.map((section, sectionIndex) => {
                const sectionKey = `pdp-section-${sectionIndex}`;

                let sectionJSX = <></>;

                // eslint-disable-next-line no-underscore-dangle
                switch (section.__typename) {
                  case `SanityGallery`:
                    sectionJSX = (
                      <section key={sectionKey}>
                        <Carousel
                          keyPrefix={sectionKey}
                          items={section.gallery.map(
                            (galleryItem, galleryItemIndex) => {
                              const key = `${sectionKey}-gallery-item-${galleryItemIndex}`;

                              return (
                                <div key={key}>
                                  <Img
                                    fluid={galleryItem.asset.fluid}
                                    alt={galleryItem.altText}
                                  />
                                </div>
                              );
                            }
                          )}
                        />
                      </section>
                    );

                    break;

                  case `SanityReviews`:
                    sectionJSX = (
                      <section key={sectionKey}>
                        <Grid styles={[tw`pt-8 pb-12`]}>
                          <div tw="col-span-12 px-3">
                            <T.Heading font="4" level="2" styles={[tw`mb-4`]}>
                              Reviews
                            </T.Heading>

                            <Carousel
                              keyPrefix={sectionKey}
                              gap={12}
                              items={section.reviews.map(
                                (reviewItem, reviewItemIndex) => {
                                  const key = `${sectionKey}-review-item-${reviewItemIndex}`;

                                  return (
                                    <article key={key} tw="p-3 bg-anti-flash">
                                      <header tw="flex justify-between">
                                        <T.Heading font="b1" level="4">
                                          {reviewItem.name}
                                        </T.Heading>

                                        <T.Caption font="b1" level="4">
                                          {reviewItem.date}
                                        </T.Caption>
                                      </header>

                                      <div tw="flex justify-between">
                                        <T.Caption styles={[tw`uppercase`]}>
                                          {reviewItem.location}
                                        </T.Caption>

                                        <div tw="flex">
                                          {Array(reviewItem.rating)
                                            .fill(null)
                                            .map((_, starIndex) => {
                                              const starKey = `${sectionKey}-rating-${starIndex}`;

                                              return (
                                                <li key={starKey}>
                                                  <Icon.Star
                                                    color="black"
                                                    styles={[
                                                      css`
                                                        height: 14px;
                                                        margin-left: 2px;
                                                        margin-top: -4px;
                                                      `
                                                    ]}
                                                  />
                                                </li>
                                              );
                                            })}
                                        </div>
                                      </div>

                                      <T.Heading
                                        font="b1"
                                        level="3"
                                        styles={[tw`mt-5 italic`]}
                                      >
                                        {reviewItem.title}
                                      </T.Heading>

                                      <T.Body font="3" styles={[tw`mt-2`]}>
                                        {reviewItem.content}
                                      </T.Body>
                                    </article>
                                  );
                                }
                              )}
                            />
                          </div>
                        </Grid>
                      </section>
                    );

                    break;

                  case `SanitySimpleText`:
                    sectionJSX = (
                      <section key={sectionKey}>
                        <Grid styles={[tw`border-t border-b pt-4 px-3 pb-6`]}>
                          <article tw="col-span-12">
                            <T.Heading font="4" level="2">
                              {section.heading}
                            </T.Heading>

                            <T.Body font="1" styles={[tw`mt-4`]}>
                              {section.content}
                            </T.Body>
                          </article>
                        </Grid>
                      </section>
                    );
                    break;

                  default:
                    break;
                }

                return sectionJSX;
              })}

            {cms?.related?.[0] && (
              <section
                css={[
                  css`
                    height: 150vw;
                  `,
                  tw`w-full relative block`
                ]}
              >
                {cms.related.map(({ shopifyProduct }) => (
                  <article
                    key={shopifyProduct.handle}
                    tw="w-full h-full relative flex flex-col justify-end overflow-hidden"
                  >
                    <img
                      tw="w-full h-full absolute top-0 right-0 bottom-0 left-0 block object-cover"
                      src={shopifyProduct.images[0].originalSrc}
                      alt={shopifyProduct.title}
                    />

                    <Grid node="header" tw="border-white border-t">
                      <T.Heading
                        font="4"
                        level="2"
                        styles={[tw`col-span-12 pt-3 text-white`]}
                      >
                        {shopifyProduct.title}
                      </T.Heading>

                      {shopifyProduct?.variants?.[0] && (
                        <T.Heading
                          font="4"
                          level="3"
                          styles={[tw`col-span-12 pb-3 text-white`]}
                        >
                          {shopifyProduct.variants[0].price}
                        </T.Heading>
                      )}
                    </Grid>

                    <ul tw="relative flex border-white border-t">
                      <li tw="w-1/3 p-3 border-white border-r">
                        <T.Caption styles={[tw`text-white`]}>Model</T.Caption>
                      </li>

                      <li tw="w-1/3 p-3 border-white border-r">
                        <T.Caption styles={[tw`text-white`]}>02134</T.Caption>
                      </li>

                      <li tw="w-1/3 pt-2 pr-2 pb-2 pl-4 flex items-end justify-end">
                        <Icon.Triangle
                          color="white"
                          styles={[tw`w-1/3 mr-2`]}
                        />
                        <Icon.Silica color="white" styles={[tw`w-1/3`]} />
                      </li>
                    </ul>
                  </article>
                ))}
              </section>
            )}
          </>
        )) || (
          <div tw="w-full h-screen relative pt-12 overflow-hidden">
            <Grid node="div" styles={[tw`h-full`]}>
              {/* // --------------------------------------------------- // */}
              {/* // col-span-6 - leftmost content (title, price, image) // */}

              <article tw="col-span-6 h-full relative flex flex-col border-r">
                <header tw="p-3">
                  <T.Heading font="4" level="1">
                    {cms.title}
                  </T.Heading>

                  {cms?.shopifyProduct?.variants?.[0] && (
                    <T.Heading font="4" level="2">
                      {`$${cms.shopifyProduct.variants[0].price}`}
                    </T.Heading>
                  )}
                </header>

                <div tw="relative flex items-center justify-between mb-4 pt-4 pr-2 pl-2 border-t">
                  <ul tw="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, starIndex) => {
                        const key = `star-${starIndex}`;

                        return (
                          <li key={key}>
                            <Icon.Star
                              color="black"
                              styles={[
                                css`
                                  height: 14px;
                                  margin-right: 2px;
                                  margin-top: -4px;
                                `
                              ]}
                            />
                          </li>
                        );
                      })}
                  </ul>

                  <T.Caption styles={[tw`uppercase`]}>(0) reviews</T.Caption>
                </div>

                <ul tw="flex border-t border-b border-black">
                  <li tw="w-1/4 h-16 relative flex items-center justify-center border-r">
                    <Icon.Triangle color="black" styles={[tw`h-8`]} />
                  </li>

                  <li tw="w-1/4 h-16 relative flex items-center justify-center border-r">
                    <Icon.Triangle color="black" styles={[tw`h-8`]} />
                  </li>

                  <li tw="w-1/4 h-16 relative flex items-center justify-center border-r">
                    <Icon.Triangle color="black" styles={[tw`h-8`]} />
                  </li>

                  <li tw="w-1/4 h-16 relative flex items-center justify-center">
                    <Icon.Triangle color="black" styles={[tw`h-8`]} />
                  </li>
                </ul>

                <figure
                  css={[
                    css`
                      flex: 1 1;
                    `,
                    tw`w-full relative overflow-hidden self-stretch`
                  ]}
                >
                  {cms?.image?.asset?.fluid && (
                    <Img
                      tw="w-full h-full relative block object-cover"
                      fluid={cms.image.asset.fluid}
                      alt={cms.title}
                    />
                  )}
                </figure>
              </article>

              {/* // --------------------------------------------------- // */}
              {/* // col-span-6 - middle content (description, variants) // */}

              <section tw="col-span-6 h-full relative overflow-y-scroll border-r">
                <div tw="p-3">
                  <T.Body
                    font="2"
                    styles={[tw`whitespace-pre-wrap`]}
                  >{`${cms.description}`}</T.Body>
                </div>

                <div tw="pt-2 px-3 pb-2 italic">
                  <T.Body font="2">{`${cms.designedFor}`}</T.Body>
                </div>

                {colorOptions?.[0] && (
                  <article tw="mt-3 p-3">
                    <header tw="">
                      <T.Heading font="b2" level="3" styles={[tw`mb-4`]}>
                        Select Color:
                      </T.Heading>
                    </header>

                    <ul tw="flex">
                      {colorOptions.map((color) => {
                        const selected = selectedOptions?.Color === color;

                        const buttonCSS = css`
                          background: ${selected
                            ? theme`colors.carbon`
                            : theme`colors.salt`};
                          color: ${selected
                            ? theme`colors.white`
                            : theme`colors.carbon`};
                        `;

                        return (
                          <li key={color} tw="col-span-2">
                            <button
                              key={color}
                              type="button"
                              css={[
                                buttonCSS,
                                tw`w-10 h-10 relative block mr-4 rounded-full border overflow-hidden`
                              ]}
                              onClick={() => selectOption(`Color`, color)}
                            >
                              <T.Caption>{color}</T.Caption>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                )}

                {sizeOptions?.[0] && (
                  <article tw="mt-2 p-3">
                    <header tw="relative flex items-center justify-between mb-2">
                      <T.Heading font="b2" level="3">
                        Select Size:
                      </T.Heading>

                      <T.Caption styles={[tw`underline`]}>Size guide</T.Caption>
                    </header>

                    <T.Caption styles={[tw`mb-4`]}>
                      {cms.sizeChartSubheading}
                    </T.Caption>

                    <ul tw="flex flex-wrap">
                      {sizeOptions.map((size) => {
                        const selected = selectedOptions?.Size === size;

                        const buttonCSS = css`
                          background: ${selected
                            ? theme`colors.carbon`
                            : theme`colors.salt`};
                          color: ${selected
                            ? theme`colors.white`
                            : theme`colors.carbon`};
                        `;

                        return (
                          <li
                            key={size}
                            css={[
                              css`
                                width: calc(25% - 2px);
                                margin: 1px;
                              `,
                              tw`relative block`
                            ]}
                          >
                            <button
                              type="button"
                              css={[
                                buttonCSS,
                                tw`w-full relative block pt-2 pr-2 pl-2 pb-8 text-left`
                              ]}
                              onClick={() => selectOption(`Size`, size)}
                            >
                              <T.Caption>{size}</T.Caption>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                )}

                {lengthOptions?.[0] && (
                  <article tw="mt-2 mb-24 p-3">
                    <header tw="">
                      <T.Heading font="b2" level="3" styles={[tw`mb-4`]}>
                        Select Length:
                      </T.Heading>
                    </header>

                    <ul tw="flex flex-wrap">
                      {lengthOptions.map((length) => {
                        const selected = selectedOptions?.Length === length;

                        const buttonCSS = css`
                          background: ${selected
                            ? theme`colors.carbon`
                            : theme`colors.salt`};
                          color: ${selected
                            ? theme`colors.white`
                            : theme`colors.carbon`};
                        `;

                        return (
                          <li
                            key={length}
                            css={[
                              css`
                                width: calc(50% - 2px);
                                margin: 1px;
                              `,
                              tw`relative block`
                            ]}
                          >
                            <button
                              type="button"
                              css={[
                                buttonCSS,
                                tw`w-full block pt-2 pr-2 pb-8 pl-2 text-left`
                              ]}
                              onClick={() => selectOption(`Length`, length)}
                            >
                              <T.Caption>{length}</T.Caption>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                )}

                <button
                  type="button"
                  tw="w-full sticky bottom-0 right-0 left-0 z-10 block mt-8 pt-5 pr-4 pb-5 pl-4 bg-violet text-white text-left uppercase"
                  onClick={() => addToCart(cartProduct)}
                >
                  <div tw="w-full flex items-center justify-between">
                    <T.Button>Add To Cart</T.Button>
                    <Icon.Arrow color="white" styles={[tw`h-4`]} />
                  </div>
                </button>
              </section>

              {/* // --------------------------------------------------- // */}
              {/* // col-span-12 - rightmost content (carousels/reviews) // */}

              <section tw="h-full col-span-12 overflow-y-scroll">
                <section
                  css={[
                    css`
                      height: 50vw;
                    `,
                    tw`relative`
                  ]}
                >
                  <Carousel
                    keyPrefix="pdp-gallery"
                    peek={0}
                    styles={[tw`h-full`]}
                    items={cms.gallery.map((galleryItem, galleryItemIndex) => {
                      const key = `gallery-item-${galleryItemIndex}`;

                      return (
                        <div key={key} className="w-full h-full">
                          <Img
                            className="w-full h-full object-cover"
                            fluid={galleryItem.asset.fluid}
                            alt={galleryItem.altText}
                          />
                        </div>
                      );
                    })}
                  />
                </section>

                {cms?.features?.[0] && (
                  <article tw="mt-2 mb-6 p-3 overflow-x-hidden border-t">
                    <header>
                      <T.Heading font="b1" level="3" styles={[tw`italic`]}>
                        Features
                      </T.Heading>
                    </header>

                    <ul tw="w-full relative list-disc list-outside ml-5 mt-4">
                      {cms.features.map((feature, featureIndex) => {
                        const key = `feature-${featureIndex}`;

                        return (
                          <li
                            key={key}
                            css={[
                              css`
                                font-family: Signifier;
                                font-size: 22px;
                                font-weight: 200;
                                line-height: 26px;
                              `
                            ]}
                          >
                            <T.Body
                              font="1"
                              styles={[
                                css`
                                  display: inline;
                                  margin-left: -0.25rem;
                                  text-align: left;
                                `
                              ]}
                            >
                              {feature}
                            </T.Body>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                )}

                {/* accordion */}

                {cms?.accordion?.[0] && (
                  <section styles={[tw`mt-6 mb-8`]}>
                    <ul tw="col-span-12 border-t">
                      {cms.accordion.map((accordion, accordionIndex) => (
                        <li key={accordion.title} tw="col-span-12 border-b">
                          <button
                            type="button"
                            tw="w-full relative block pt-4 pr-3 pb-6 pl-3"
                            onClick={() =>
                              setExpandedAccordion(
                                expandedAccordion === accordionIndex
                                  ? null
                                  : accordionIndex
                              )
                            }
                          >
                            <div tw="w-full flex justify-between">
                              <T.Body>{accordion.title}</T.Body>
                              <T.Caption styles={[tw`uppercase`]}>
                                More +
                              </T.Caption>
                            </div>

                            {expandedAccordion === accordionIndex && (
                              <T.Body styles={[tw`mt-6 text-left`]}>
                                {accordion.content}
                              </T.Body>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* sections */}

                {cms?.sections?.[0] &&
                  cms.sections.map((section, sectionIndex) => {
                    const sectionKey = `pdp-section-${sectionIndex}`;

                    let sectionJSX = <></>;

                    // eslint-disable-next-line no-underscore-dangle
                    switch (section.__typename) {
                      case `SanityGallery`:
                        sectionJSX = (
                          <section key={sectionKey}>
                            <Carousel
                              keyPrefix={sectionKey}
                              items={section.gallery.map(
                                (galleryItem, galleryItemIndex) => {
                                  const key = `${sectionKey}-gallery-item-${galleryItemIndex}`;

                                  return (
                                    <div key={key}>
                                      <Img
                                        fluid={galleryItem.asset.fluid}
                                        alt={galleryItem.altText}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            />
                          </section>
                        );

                        break;

                      case `SanityReviews`:
                        sectionJSX = (
                          <section key={sectionKey}>
                            <div tw="pt-8 pb-12 px-3">
                              <div tw="col-span-12">
                                <T.Heading
                                  font="4"
                                  level="2"
                                  styles={[tw`mb-4`]}
                                >
                                  Reviews
                                </T.Heading>

                                <Carousel
                                  keyPrefix={sectionKey}
                                  gap={12}
                                  items={section.reviews.map(
                                    (reviewItem, reviewItemIndex) => {
                                      const key = `${sectionKey}-review-item-${reviewItemIndex}`;

                                      return (
                                        <article
                                          key={key}
                                          tw="p-5 bg-anti-flash"
                                        >
                                          <header tw="flex justify-between">
                                            <T.Heading font="b2" level="3">
                                              {reviewItem.name}
                                            </T.Heading>

                                            <T.Caption font="b2" level="4">
                                              {reviewItem.date}
                                            </T.Caption>
                                          </header>

                                          <div tw="flex justify-between">
                                            <T.Caption styles={[tw`uppercase`]}>
                                              {reviewItem.location}
                                            </T.Caption>

                                            <div tw="flex">
                                              {Array(reviewItem.rating)
                                                .fill(null)
                                                .map((_, starIndex) => {
                                                  const starKey = `${sectionKey}-rating-${starIndex}`;

                                                  return (
                                                    <li key={starKey}>
                                                      <Icon.Star
                                                        color="black"
                                                        styles={[
                                                          css`
                                                            height: 14px;
                                                            margin-left: 2px;
                                                            margin-top: -4px;
                                                          `
                                                        ]}
                                                      />
                                                    </li>
                                                  );
                                                })}
                                            </div>
                                          </div>

                                          <T.Heading
                                            font="b2"
                                            level="3"
                                            styles={[tw`mt-5 italic`]}
                                          >
                                            {reviewItem.title}
                                          </T.Heading>

                                          <T.Body font="2" styles={[tw`mt-2`]}>
                                            {reviewItem.content}
                                          </T.Body>
                                        </article>
                                      );
                                    }
                                  )}
                                />
                              </div>
                            </div>
                          </section>
                        );

                        break;

                      case `SanitySimpleText`:
                        sectionJSX = (
                          <section key={sectionKey}>
                            <article tw="border-t border-b pt-4 pb-6 px-3">
                              <T.Heading font="4" level="2">
                                {section.heading}
                              </T.Heading>

                              <T.Body font="1" styles={[tw`mt-4`]}>
                                {section.content}
                              </T.Body>
                            </article>
                          </section>
                        );
                        break;

                      default:
                        break;
                    }

                    return sectionJSX;
                  })}

                {cms?.related?.[0] && (
                  <section
                    css={[
                      css`
                        height: 50vw;
                      `,
                      tw`w-full relative block`
                    ]}
                  >
                    <header tw="border-b pt-4 pb-6 px-3">
                      <T.Heading font="4" level="2">
                        Other Products
                      </T.Heading>
                    </header>

                    {cms.related.map(({ shopifyProduct }) => (
                      <article
                        key={shopifyProduct.handle}
                        tw="w-full h-full relative flex flex-col justify-end overflow-hidden"
                      >
                        <img
                          tw="w-full h-full absolute top-0 right-0 bottom-0 left-0 block object-cover"
                          src={shopifyProduct.images[0].originalSrc}
                          alt={shopifyProduct.title}
                        />

                        <header tw="border-white border-t">
                          <T.Heading
                            font="4"
                            level="2"
                            styles={[tw`col-span-12 pt-3 text-white`]}
                          >
                            {shopifyProduct.title}
                          </T.Heading>

                          {shopifyProduct?.variants?.[0] && (
                            <T.Heading
                              font="4"
                              level="3"
                              styles={[tw`col-span-12 pb-3 text-white`]}
                            >
                              {shopifyProduct.variants[0].price}
                            </T.Heading>
                          )}
                        </header>

                        <ul tw="relative flex border-white border-t">
                          <li tw="w-1/3 p-3 border-white border-r">
                            <T.Caption styles={[tw`text-white`]}>
                              Model
                            </T.Caption>
                          </li>

                          <li tw="w-1/3 p-3 border-white border-r">
                            <T.Caption styles={[tw`text-white`]}>
                              02134
                            </T.Caption>
                          </li>

                          <li tw="w-1/3 pt-2 pr-2 pb-2 pl-4 flex items-end justify-end">
                            <Icon.Triangle
                              color="white"
                              styles={[tw`w-8 mr-2`]}
                            />
                            <Icon.Silica color="white" styles={[tw`w-8`]} />
                          </li>
                        </ul>
                      </article>
                    ))}
                  </section>
                )}
              </section>
            </Grid>
          </div>
        )}

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
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        altText
      }
      gallery {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        altText
      }
      description
      designedFor
      features
      sizeChartSubheading
      accordion {
        title
        content
      }

      sections {
        ... on SanityGallery {
          gallery {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
            altText
          }
        }
        ... on SanityReviews {
          reviews {
            name
            location
            date
            rating
            title
            content
          }
        }
        ... on SanitySimpleText {
          heading
          content
        }
      }

      related {
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
