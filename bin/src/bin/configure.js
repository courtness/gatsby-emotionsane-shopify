"use strict";

import inquirer from "inquirer";
import fs from "fs";

const configure = () => {
  inquirer
    .prompt([
      {
        type: `input`,
        name: `GSS_NAME`,
        message: `Enter your site name (e.g. My Site):`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GSS_DESCRIPTION`,
        message: `Enter your site description:`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `SANITY_DATASET`,
        message: `Enter the Sanity dataset to use (e.g. production):`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `SANITY_PROJECT_ID`,
        message: `Enter the Sanity Project ID:`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `SANITY_TOKEN`,
        message: `Enter the Sanity read/write token:`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GATSBY_SHOPIFY_STORE`,
        message: `Enter your Shopify Store name (e.g. my-shopify-store):`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GATSBY_SHOPIFY_KEY`,
        message: `Enter your Shopify API key:`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GATSBY_SHOPIFY_PASSWORD`,
        message: `Enter your Shopify API password:`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GATSBY_SHOPIFY_STOREFRONT_TOKEN`,
        message: `Enter your Shopify Storefront Token:`,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      }
    ])
    .then((responses) => {
      let responseCount = 0;
      let writeableString = ``;

      Object.keys(responses).map((responseKey, responseIndex) => {
        const response = responses[responseKey];

        if (responseKey === `continue`) {
          return;
        }

        if (responseCount > 0) {
          writeableString += `\n`;
        }

        writeableString += `${responseKey}=${response}`;

        responseCount += 1;
      });

      console.log(`\nWriting to .env files:\n${writeableString}\n`);

      inquirer
        .prompt([
          {
            type: `confirm`,
            name: `continue`,
            message: `Continue?`,
            default: false
          }
        ])
        .then((responses) => {
          if (!responses?.continue) {
            console.log(`[info] Aborted`);
            return;
          }

          Object.keys(global.envFiles).forEach((envFileKey) => {
            const envFile = global.envFiles[envFileKey];

            try {
              fs.writeFile(envFile, writeableString, (err) => {
                if (err) {
                  throw err;
                }

                console.log(`\n[info] Data written to ${envFile}.`);
              });
            } catch (e) {
              console.error(e);
            }
          });
        });
    });
};

export default configure;
