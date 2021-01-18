"use strict";

import { setFileSystem, storeArgs } from "~src/utils";
import SanityAPI from "~src/api/SanityAPI";
import ShopifyAPI from "~src/api/ShopifyAPI";

global.dirname = __dirname;

/**
 * -----------------------------------------------------------------------------
 * Fetch product data from the Shopify API and cache a Sanity-compatible JSON.
 * @return {null}
 */
const autofill = ({
  sanityDataset,
  sanityProjectId,
  sanityToken,
  shopifyKey,
  shopifyPassword,
  shopifyStore
}) => {
  const sanity = new SanityAPI({
    dataset: sanityDataset,
    projectId: sanityProjectId,
    token: sanityToken
  });
  const shopify = new ShopifyAPI({
    key: shopifyKey,
    password: shopifyPassword,
    store: shopifyStore
  });

  if (!sanity.valid()) {
    throw new Error(`Sanity credentials are unset`);
  }

  if (!shopify.valid()) {
    throw new Error(`Shopify credentials are unset`);
  }

  try {
    shopify
      .import()
      .then((products) => {
        console.log(`[info] Shopify download complete`);

        sanity.transform(products).then((documents) => {
          console.log(`[info] Shopify transform complete`);

          sanity.upload(documents).then(() => {
            console.log(`[info] Sanity upload complete`);
          });
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    console.error(`\n[error] Shopify import failed: ${err}`);
  }
};

exports.autofill = autofill;

/**
 * -----------------------------------------------------------------------------
 * Default entry point with optional CLI argument parsing.
 * @return {null}
 */
const main = () => {
  storeArgs();

  try {
    setFileSystem();
  } catch (e) {
    console.error(
      `[error] Error caught trying to create file directories: ${err}`
    );
    return;
  }

  if (global?.args?.mode === `cli`) {
    if (
      !global?.args?.[`sanity-dataset`] ||
      !global?.args?.[`sanity-project-id`] ||
      !global?.args?.[`sanity-token`] ||
      !global?.args?.[`shopify-password`] ||
      !global?.args?.[`shopify-key`] ||
      !global?.args?.[`shopify-password`] ||
      !global?.args?.[`shopify-store`]
    ) {
      console.error(`\n[error] Required arguments unset.\n`);
      return;
    }

    autofill({
      sanityDataset: global.args[`sanity-dataset`],
      sanityProjectId: global.args[`sanity-project-id`],
      sanityToken: global.args[`sanity-token`],
      shopifyKey: global.args[`shopify-key`],
      shopifyPassword: global.args[`shopify-password`],
      shopifyStore: global.args[`shopify-store`]
    });
  }
};

main();
