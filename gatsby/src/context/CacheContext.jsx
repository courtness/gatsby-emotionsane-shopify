/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getInventoryIdByVariantSku,
  getInventoryLevelsByIds
} from "~utils/shopify";

export const CacheContext = createContext({});

const CacheProvider = ({ children }) => {
  const [inventory, setInventory] = useState(null);
  const [inventoryFetched, setInventoryFetched] = useState(false);

  //

  const refreshInventory = (products, adminProducts) => {
    if (
      typeof window === `undefined` ||
      typeof fetch === `undefined` ||
      window.location.href.includes(`localhost`)
    ) {
      setInventory({});
      return;
    }

    const variantsByInventoryId = {};

    products.forEach((product) => {
      if (product?.variants[0]) {
        product.variants.forEach((variant) => {
          const inventoryId = getInventoryIdByVariantSku(
            adminProducts.edges,
            variant.sku
          );

          if (inventoryId && inventoryId !== ``) {
            variantsByInventoryId[inventoryId] = variant;
          }
        });
      }
    });

    getInventoryLevelsByIds(Object.keys(variantsByInventoryId).join()).then(
      (response) => {
        response.json().then((shopifyInventory) => {
          const newInventory = {};

          if (!shopifyInventory?.inventory_levels?.[0]) {
            setInventory(newInventory);
            return;
          }

          shopifyInventory.inventory_levels.forEach((inventoryLevel) => {
            const variant =
              variantsByInventoryId[inventoryLevel.inventory_item_id];

            if (typeof inventoryLevel.available === `undefined`) {
              newInventory[variant.id] = 0;

              return;
            }

            newInventory[variant.id] = inventoryLevel.available;
          });

          setInventory(newInventory);
        });
      }
    );
  };

  useEffect(() => {
    if (inventory) {
      setInventoryFetched(true);
    }
  }, [inventory]);

  return (
    <CacheContext.Provider
      value={{
        inventory,
        setInventory,
        refreshInventory,
        inventoryFetched,
        setInventoryFetched
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

CacheProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CacheProvider;
