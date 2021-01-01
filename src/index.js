`use strict`;

require(`dotenv`).config({ debug: true });

exports.__esModule = true;

import inquirer from "inquirer";
import configure from "~src/bin/configure";
import sanitise from "~src/bin/sanitise";
import style from "~src/bin/style";
import { printBanner, storeArgs } from "~src/utils";

global.dirname = __dirname;

const main = () => {
  printBanner();
  storeArgs();

  //

  const modeSelect = (mode) => {
    switch (mode) {
      case `sanitise`:
        sanitise();
        break;

      case `c`:
      case `config`:
      case `configure`:
        configure();
        break;

      case `s`:
      case `style`:
        style();
        break;

      default:
        console.error(`[err]  Unknown mode: '${mode}'`);
        break;
    }
  };

  //

  if (global?.args?.mode) {
    modeSelect(global.args.mode);
  } else {
    console.log(`- Configure : Create a new .env file (do this first)`);
    console.log(`- Style     : Adjust the grid, typography and colours`);
    console.log(`- Sanitise  : Download Shopify data and push to Sanity`);
    console.log(
      `-----------------------------------------------------------------------------\n`
    );

    inquirer
      .prompt([
        {
          type: `list`,
          name: `mode`,
          message: `Select your mode:`,
          choices: [`Configure`, `Style`, `Sanitise`],
          filter: (val) => {
            return val.toLowerCase();
          }
        }
      ])
      .then((response) => {
        modeSelect(response.mode);
      });
  }
};

exports.main = main;

main();
