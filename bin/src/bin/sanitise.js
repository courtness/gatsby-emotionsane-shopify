"use strict";

import { autofill } from "sanity-shopify-autofill";
import {
  GSS_SANITY_DATASET,
  GSS_SANITY_PROJECT_ID,
  GSS_SANITY_TOKEN,
  GSS_SHOPIFY_KEY,
  GSS_SHOPIFY_PASSWORD,
  GSS_SHOPIFY_STORE
} from "@env";
import fs from "fs";

export const sanitise = () => {
  if (!global?.envFile || !fs.existsSync(global.envFile)) {
    console.error(`\n[error] .env is unset, run Configure first.`);
    return;
  }

  if (
    typeof GSS_SHOPIFY_KEY !== `string` ||
    typeof GSS_SHOPIFY_PASSWORD !== `string` ||
    typeof GSS_SHOPIFY_STORE !== `string` ||
    typeof GSS_SANITY_DATASET !== `string` ||
    typeof GSS_SANITY_PROJECT_ID !== `string` ||
    typeof GSS_SANITY_TOKEN !== `string`
  ) {
    console.error(
      `[error] Required environment variables unset. Try re-running configure, or checking your .env file.`
    );
    return;
  }

  //

  const autofillConfig = {
    sanityDataset: GSS_SANITY_DATASET,
    sanityProjectId: GSS_SANITY_PROJECT_ID,
    sanityToken: GSS_SANITY_TOKEN,
    shopifyKey: GSS_SHOPIFY_KEY,
    shopifyPassword: GSS_SHOPIFY_PASSWORD,
    shopifyStore: GSS_SHOPIFY_STORE
  };

  console.log(autofillConfig);

  autofill(autofillConfig);
};

export default sanitise;
