`use strict`;

(() => {
  const STOREFRONT_URL = `/`;

  const validPathPrefixes = [
    `/account`,
    `/checkout`,
    `/challenge`,
    `/portal`,
    `/tools`
  ];

  //

  const valid = () => {
    let pathAllowed = false;

    validPathPrefixes.forEach((validPathPrefix) => {
      if (pathAllowed) {
        return;
      }

      pathAllowed = window.top.location.href.indexOf(validPathPrefix) !== -1;
    });

    if (!pathAllowed) {
      // window.top.location.href = STOREFRONT_URL;

      return false;
    }

    return true;
  };

  //

  const preflight = () => {
    setTimeout(() => {
      document.getElementsByTagName(`body`)[0].classList.remove(`opacity-0`);
    }, 250);

    /*
    // change the /account path return-to values

    const $returnTo = $(
      `<input type="hidden" name="return_to" value="/account" />`
    );

    if ($(`#create_customer`).length > 0) {
      $returnTo.insertBefore($(`#create_customer input[type="submit"]`));
    } else if ($(`#g-recaptcha`).length) {
      $returnTo.insertBefore(
        $(`.shopify-challenge__container input[type="submit"]`)
      );
    }

    $(`a[href^="/account/logout"]`).on(`click`, (e) => {
      $.ajax($(this).attr(`href`)).done(() => {
        window.location.href = `/account/login`;
      });

      return false;
    });
    */
  };

  //

  const main = () => {
    document.addEventListener(`DOMContentLoaded`, () => {
      document.querySelectorAll(`[data-template]`).forEach((element) => {
        const templateId = element.getAttribute(`data-template`);
        const fn = window[templateId];

        if (typeof fn === `function`) {
          fn();
        }
      });
    });
  };

  //--------------------------------------------------------------------------//

  if (!valid()) {
    return;
  }

  preflight();

  main();
})();
