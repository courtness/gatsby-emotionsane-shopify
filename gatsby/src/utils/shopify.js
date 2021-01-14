/* eslint-disable import/prefer-default-export */

import { fancyWarning } from "~utils/helpers";

//------------------------------------------------------------------------------

export async function getCheckoutURL(cart, currencyCode) {
  const url = `${process.env.GATSBY_NETLIFY_FUNCTIONS}/shopify-storefront-graphql`;

  let lineItemsString = `[`;

  cart.forEach((cartItem, cartItemIndex) => {
    let prefix = ``;

    if (cartItemIndex !== 0) {
      prefix = `, `;
    }

    lineItemsString += `${prefix}{variantId: "${cartItem.variantId.replace(
      `Shopify__ProductVariant__`,
      ``
    )}", quantity: ${cartItem.quantity}}`;
  });

  lineItemsString += `]`;

  const query = `
    mutation {
      checkoutCreate(
        input: {
          lineItems: ${lineItemsString},
          presentmentCurrencyCode: ${currencyCode}
        }
      ) {
        checkout {
          id
          webUrl
        }
      }
    }
  `;

  const response = await fetch(url, {
    body: JSON.stringify(query),
    headers: new Headers({
      "Content-Type": `application/json`
    }),
    method: `POST`
  });

  return response;
}

//------------------------------------------------------------------------------

export function getInventoryIdByVariantSku(adminProducts, variantSku) {
  let id;

  adminProducts.forEach(({ node }) => {
    if (id || !node?.products?.[0]) {
      return;
    }

    node.products.forEach((product) => {
      if (id || !product?.variants?.[0]) {
        return;
      }

      product.variants.forEach((variant) => {
        if (id) {
          return;
        }

        if (variant.sku === variantSku) {
          id = variant.inventory_item_id;
        }
      });
    });
  });

  return id;
}

//------------------------------------------------------------------------------

export async function getInventoryLevelsByIds(ids) {
  let url = `${process.env.GATSBY_NETLIFY_FUNCTIONS}/get-shopify-inventory`;

  if (
    process.env.GATSBY_REGION_CODE &&
    process.env.GATSBY_REGION_CODE !== `` &&
    process.env.GATSBY_REGION_CODE.toLowerCase() !== `us`
  ) {
    url = `${
      process.env.GATSBY_NETLIFY_FUNCTIONS
    }/get-shopify-inventory-${process.env.GATSBY_REGION_CODE.toLowerCase()}`;
  }

  const response = await fetch(url, {
    body: JSON.stringify({
      ids
    }),
    headers: new Headers({
      "Content-Type": `application/json`
    }),
    method: `POST`
  });

  return response;
}

//------------------------------------------------------------------------------

export function getPriceByCurrency(variant, currencyCode) {
  let price;

  if (!variant?.presentmentPrices?.edges?.[0]) {
    fancyWarning(`Presentment prices not found`);

    ({ price } = variant);
  } else {
    variant.presentmentPrices.edges.forEach(({ node }) => {
      if (price) {
        return;
      }

      if (node.price.currencyCode === currencyCode) {
        price = node.price.amount;
      }
    });
  }

  if (currencyCode === `JPY`) {
    return parseInt(price);
  }

  return parseFloat(price).toFixed(2);
}

//------------------------------------------------------------------------------

export function getSelectableOptions(product) {
  const selectableOptions = {};

  if (!product?.variants?.[0]) {
    return selectableOptions;
  }

  product.variants.forEach((variant) => {
    variant.selectedOptions.forEach((selectedOption) => {
      if (!selectableOptions[selectedOption.name]) {
        selectableOptions[selectedOption.name] = [];
      }

      if (
        !selectableOptions[selectedOption.name].includes(selectedOption.value)
      ) {
        selectableOptions[selectedOption.name].push(selectedOption.value);
      }
    });
  });

  Object.keys(selectableOptions).forEach((selectableOptionKey) => {
    if (selectableOptions[selectableOptionKey].length <= 1) {
      delete selectableOptions[selectableOptionKey];
    }
  });

  return selectableOptions;
}

//------------------------------------------------------------------------------

export function getVariantByOptions(product, userSelectedOptions) {
  const userSelectedOptionKeys = Object.keys(userSelectedOptions);
  const scoreThreshold = userSelectedOptionKeys.length;

  let matchedVariant = null;

  if (!product?.variants?.[0]) {
    return matchedVariant;
  }

  product.variants.forEach((variant) => {
    if (matchedVariant) {
      return;
    }

    let score = 0;

    variant.selectedOptions.forEach((variantOption) => {
      userSelectedOptionKeys.forEach((userSelectedOptionKey) => {
        const userSelectedOption = userSelectedOptions[userSelectedOptionKey];

        if (
          variantOption.name === userSelectedOptionKey &&
          variantOption.value === userSelectedOption
        ) {
          score += 1;
        }
      });
    });

    if (score >= scoreThreshold) {
      matchedVariant = variant;
    }
  });

  return matchedVariant;
}
