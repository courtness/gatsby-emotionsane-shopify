"use strict";

import { autofill } from "sanity-shopify-autofill";
import {
  GATSBY_SHOPIFY_KEY,
  GATSBY_SHOPIFY_PASSWORD,
  GATSBY_SHOPIFY_STORE,
  GATSBY_SHOPIFY_STOREFRONT_TOKEN,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_TOKEN
} from "@env";
import fs from "fs";

export const prefill = () => {
  if (!global?.envFile || !fs.existsSync(global.envFile)) {
    console.error(`\n[error] .env is unset, run Configure first.`);
    return;
  }

  if (
    typeof GATSBY_SHOPIFY_STORE !== `string` ||
    typeof GATSBY_SHOPIFY_STOREFRONT_TOKEN !== `string` ||
    typeof GATSBY_SHOPIFY_KEY !== `string` ||
    typeof GATSBY_SHOPIFY_PASSWORD !== `string` ||
    typeof SANITY_DATASET !== `string` ||
    typeof SANITY_PROJECT_ID !== `string` ||
    typeof SANITY_TOKEN !== `string`
  ) {
    console.error(
      `[error] Required environment variables unset. Try re-running configure, or checking your .env file.`
    );
    return;
  }

  //

  const autofillConfig = {
    sanityDataset: SANITY_DATASET,
    sanityProjectId: SANITY_PROJECT_ID,
    sanityToken: SANITY_TOKEN,
    shopifyKey: GATSBY_SHOPIFY_KEY,
    shopifyPassword: GATSBY_SHOPIFY_PASSWORD,
    shopifyStore: GATSBY_SHOPIFY_STORE,
    shopifyStorefrontToken: GATSBY_SHOPIFY_STOREFRONT_TOKEN
  };

  console.log(autofillConfig);

  autofill(autofillConfig);
};

export default prefill;
