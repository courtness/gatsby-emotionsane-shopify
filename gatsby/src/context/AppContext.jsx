/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { globalHistory } from "@reach/router";
import { trigger } from "~utils/analytics";
import { fancyError } from "~utils/helpers";
import { getCheckoutURL } from "~utils/shopify";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [activeCurrency, setActiveCurrency] = useState(null);
  const [activeCurrencySymbol, setActiveCurrencySymbol] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartActive, setCartActive] = useState(false);
  const [cookies, setCookie] = useCookies(null);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookieMessageActive, setCookieMessageActive] = useState(false);
  const [headerOpaque, setHeaderOpaque] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [pathname, setPathname] = useState(null);

  //

  const setDefaultCurrency = () => {
    let defaultCurrency;

    switch (process.env.GATSBY_REGION_CODE.toLowerCase()) {
      case `au`:
        defaultCurrency = `AUD`;
        break;

      case `eu`:
        defaultCurrency = `EUR`;
        break;

      case `us`:
      default:
        defaultCurrency = `USD`;
        break;
    }

    setActiveCurrency(defaultCurrency);
    setActiveCurrencySymbol(getSymbolFromCurrency(defaultCurrency));
  };

  //

  useEffect(() => {
    if (typeof window !== `undefined` && window?.location?.pathname) {
      setPathname(window.location.pathname);
    }

    setDefaultCurrency();

    //

    if (!cookies?.accepted) {
      setCookieMessageActive(true);
    } else {
      setCookiesAccepted(true);

      if (cookies?.[`${process.env.GATSBY_REGION_CODE}_cart`]) {
        const parsedCart = cookies[`${process.env.GATSBY_REGION_CODE}_cart`];

        let valid =
          Array.isArray(cookies[`${process.env.GATSBY_REGION_CODE}_cart`]) &&
          cookies?.[`${process.env.GATSBY_REGION_CODE}_cart`]?.[0];

        if (valid) {
          parsedCart.forEach((cookieCartItem) => {
            if (!valid) {
              return;
            }

            if (
              typeof cookieCartItem === `undefined` ||
              cookieCartItem === null ||
              cookieCartItem === false ||
              cookieCartItem === `` ||
              !cookieCartItem?.variantId ||
              !cookieCartItem?.quantity
            ) {
              valid = false;
            }
          });
        }

        if (!valid || process.env.GATSBY_RESET_COOKIES) {
          setCart([]);
          setCookie([`${process.env.GATSBY_REGION_CODE}_cart`], [], {
            path: `/`
          });
        } else {
          setCart(parsedCart);
        }
      }

      if (cookies?.currency) {
        setActiveCurrency(cookies.currency);
      }
    }

    //

    return globalHistory.listen(({ location }) => {
      setPathname(location.pathname);
    });
  }, []);

  //

  const addToCart = (productWithVariant, quantity = 1) => {
    if (!productWithVariant?.variant) {
      return;
    }

    let existingCartPosition = null;

    const cartClone = JSON.parse(JSON.stringify(cart));

    cartClone.forEach((cartItem, cartIndex) => {
      if (existingCartPosition !== null) {
        return;
      }

      if (cartItem.variantId === productWithVariant.variant.id) {
        existingCartPosition = cartIndex;
      }
    });

    if (existingCartPosition === null) {
      cartClone.push({
        quantity,
        variantId: productWithVariant.variant.id
      });
    } else {
      cartClone[existingCartPosition].quantity += quantity;
    }

    setCartActive(true);
    setCart(cartClone);

    if (cookiesAccepted) {
      setCookie(`${process.env.GATSBY_REGION_CODE}_cart`, cartClone, {
        path: `/`
      });

      trigger(`addToCart`, productWithVariant, quantity);
    }
  };

  const checkout = () => {
    if (
      !process.env.GATSBY_SHOPIFY_STORE ||
      process.env.GATSBY_SHOPIFY_STORE === ``
    ) {
      fancyError(`Shopify environment variables have not been defined.`);

      return;
    }

    setCartActive(false);

    getCheckoutURL(cart, activeCurrency).then((response) => {
      response.json().then(({ data }) => {
        if (data?.checkoutCreate?.checkout?.webUrl) {
          const { webUrl } = data.checkoutCreate.checkout;

          // prod check-in routing goes here

          window.location.href = webUrl;
        }
      });
    });
  };

  const decreaseQuantityByCartIndex = (cartIndex) => {
    if (!cart?.[cartIndex]) {
      return;
    }

    const cartClone = JSON.parse(JSON.stringify(cart));

    if (cartClone[cartIndex].quantity <= 1) {
      cartClone.splice(cartIndex, 1);
    } else {
      cartClone[cartIndex].quantity -= 1;
    }

    setCart(cartClone);

    if (cookiesAccepted) {
      setCookie([`${process.env.GATSBY_REGION_CODE}_cart`], cartClone, {
        path: `/`
      });

      trigger(`checkout`, cartClone);
    }
  };

  const increaseQuantityByCartIndex = (cartIndex) => {
    if (!cart?.[cartIndex]) {
      return;
    }

    const cartClone = JSON.parse(JSON.stringify(cart));

    cartClone[cartIndex].quantity += 1;

    setCart(cartClone);

    if (cookiesAccepted) {
      setCookie([`${process.env.GATSBY_REGION_CODE}_cart`], cartClone, {
        path: `/`
      });

      trigger(`addToCart`, cartClone[cartIndex]);
    }
  };

  const removeFromCartByIndex = (cartIndex) => {
    if (!cart?.[cartIndex]) {
      return;
    }

    const cartClone = JSON.parse(JSON.stringify(cart));

    cartClone.splice(cartIndex, 1);

    setCart(cartClone);

    if (cookiesAccepted) {
      setCookie([`${process.env.GATSBY_REGION_CODE}_cart`], cartClone, {
        path: `/`
      });

      trigger(`removeFromCart`);
    }
  };

  //

  useEffect(() => {
    if (cookiesAccepted) {
      setCookie(`accepted`, true, { path: `/` });
    }
  }, [cookiesAccepted]);

  useEffect(() => {
    if (cookiesAccepted) {
      setCookie(`${process.env.GATSBY_REGION_CODE}_currency`, activeCurrency, {
        path: `/`
      });
    }

    setActiveCurrencySymbol(getSymbolFromCurrency(activeCurrency));
  }, [activeCurrency, cookiesAccepted]);

  //

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        cartActive,
        setCartActive,
        activeCurrencySymbol,
        setActiveCurrencySymbol,
        activeCurrency,
        setActiveCurrency,
        cookiesAccepted,
        setCookiesAccepted,
        cookieMessageActive,
        setCookieMessageActive,
        headerOpaque,
        setHeaderOpaque,
        menuActive,
        setMenuActive,
        pathname,
        //
        addToCart,
        checkout,
        decreaseQuantityByCartIndex,
        increaseQuantityByCartIndex,
        removeFromCartByIndex
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
