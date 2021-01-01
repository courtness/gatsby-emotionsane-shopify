"use strict";

import inquirer from "inquirer";
import fs from "fs";

const configure = () => {
  const fileExists = fs.existsSync(global.envFile);

  inquirer
    .prompt([
      {
        type: `confirm`,
        name: `continue`,
        message: `This will overwrite your existing .env file. Continue?`,
        default: false,
        when: fileExists
      },
      {
        type: `input`,
        name: `GSS_NAME`,
        message: `Enter your site name (e.g. My Site):`,
        when: (responses) => !fileExists || responses.continue,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GSS_DESCRIPTION`,
        message: `Enter your site description:`,
        when: (responses) => !fileExists || responses.continue,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GSS_SHOPIFY_STORE`,
        message: `Enter your Shopify Store name (e.g. my-shopify-store):`,
        when: (responses) => !fileExists || responses.continue,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GSS_SHOPIFY_KEY`,
        message: `Enter your Shopify API key:`,
        when: (responses) => !fileExists || responses.continue,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      },
      {
        type: `input`,
        name: `GSS_SHOPIFY_PASSWORD`,
        message: `Enter your Shopify API password:`,
        when: (responses) => !fileExists || responses.continue,
        validate: (value) => {
          return (value && value !== ``) || `Please enter a value`;
        }
      }
    ])
    .then((responses) => {
      if (fileExists && !responses?.continue) {
        console.log(`\n[info] Aborted.\n`);
        return;
      }

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

      try {
        fs.writeFile(global.envFile, writeableString, (err) => {
          if (err) {
            throw err;
          }

          console.log(`\n[info] Complete! Check your root .env file.\n`);
        });
      } catch (e) {
        console.error(e);
      }
    });
};

export default configure;
