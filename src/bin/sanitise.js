"use strict";

import { autofill } from "sanity-shopify-autofill";
import { GSS_SHOPIFY_KEY, GSS_SHOPIFY_PASSWORD, GSS_SHOPIFY_STORE } from "@env";
import fs from "fs";

export const sanitise = () => {
  if (!global?.envFile || !fs.existsSync(global.envFile)) {
    console.error(`[err]  .env is unset, run Configure first.\n`);
  }

  if (
    !GSS_SHOPIFY_KEY?.length ||
    !GSS_SHOPIFY_PASSWORD?.length ||
    !GSS_SHOPIFY_STORE?.length
  ) {
    console.error(
      `[err]  Required environment variables unset. Try re-running Configure.`
    );
  }

  //

  console.log(GSS_SHOPIFY_KEY);
  console.log(GSS_SHOPIFY_PASSWORD);
  console.log(GSS_SHOPIFY_STORE);

  autofill({
    shopifyKey: GSS_SHOPIFY_KEY,
    shopifyPassword: GSS_SHOPIFY_PASSWORD,
    shopifyStore: GSS_SHOPIFY_STORE
  });
};

export default sanitise;
