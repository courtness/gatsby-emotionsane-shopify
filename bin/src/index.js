`use strict`;

exports.__esModule = true;

import inquirer from "inquirer";
import configure from "~src/bin/configure";
import prefill from "~src/bin/prefill";
import style from "~src/bin/style";
import { printBanner, storeArgs } from "~src/utils";

global.dirname = __dirname;

const main = () => {
  printBanner();
  storeArgs();

  //

  const modeSelect = (mode) => {
    switch (mode) {
      case `p`:
      case `prefill`:
        prefill();
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
    console.log(`- Configure : Create all required .env files`);
    console.log(`- Style     : Define the grid, typography and colours`);
    console.log(`- Prefill   : Download and push Shopify products to Sanity`);
    console.log(
      `-----------------------------------------------------------------------------\n`
    );

    inquirer
      .prompt([
        {
          type: `list`,
          name: `mode`,
          message: `Select your mode:`,
          choices: [`Configure`, `Style`, `Prefill`],
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

main();
