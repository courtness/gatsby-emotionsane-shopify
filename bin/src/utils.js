"use strict";

import parseArgs from "minimist";

/**
 * -----------------------------------------------------------------------------
 * Print a pretty banner cos we fancy like that
 * @return {null}
 */
export const printBanner = () => {
  console.log(
    `\n=============================================================================`
  );
  console.log(`
  █▀▀ ▄▀█ ▀█▀ █▀ █▄▄ █▄█   █▀ ▄▀█ █▄░█ █ ▀█▀ █▄█   █▀ █░█ █▀█ █▀█ █ █▀▀ █▄█
  █▄█ █▀█ ░█░ ▄█ █▄█ ░█░   ▄█ █▀█ █░▀█ █ ░█░ ░█░   ▄█ █▀█ █▄█ █▀▀ █ █▀░ ░█░

                                [ G S S ]`);
  console.log(
    `-----------------------------------------------------------------------------`
  );
};

/**
 * -----------------------------------------------------------------------------
 * Store user-supplied CLI arguments in the global object.
 * @return {null}
 */
export const storeArgs = () => {
  const args = parseArgs(process.argv.slice(2));
  const parsedArgs = {};

  Object.keys(args).forEach((key) => {
    if (key !== `_`) {
      parsedArgs[key.toLowerCase()] = args[key];
    }
  });

  global.args = parsedArgs;
  global.envFile = `${global.dirname}/../.env`;
};
