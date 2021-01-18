import { promises as fs, promises } from "fs";
import sanityClient from "@sanity/client";

// import PQueue from `p-queue`;

/**
 *  @class SanityAPI
 *  @type {Object}
 *  @property {string} projectId Sanity API Project ID
 *  @property {string} password Sanity API Dataset id (e.g. production)
 */
class SanityAPI {
  constructor({ dataset, projectId, token }) {
    this.client = sanityClient({
      dataset,
      projectId,
      token,
      useCdn: false
    });
  }

  /**
   * -----------------------------------------------------------------------------
   * Determine whether an instantiated object can be used for API requests.
   * @return {boolean} Validity of the class instance
   */
  valid = () => {
    return typeof this.client !== `undefined`;
  };

  /**
   * -----------------------------------------------------------------------------
   * Convert Shopify product data to a Sanity-compatible document JSON file.
   * @return {Promise} The completion state of the document cache operation
   */
  transform = (shopifyProducts, excludedHandles = []) => {
    const sanityDocuments = [];

    if (!shopifyProducts?.[0]) {
      console.error(
        `Shopify data did not contain a 'products' object. Aborting.`
      );
    }

    shopifyProducts.forEach((shopifyProduct, shopifyProductIndex) => {
      if (excludedHandles.includes(shopifyProduct.handle)) {
        return;
      }

      //

      const sanityDocument = {
        _id: `shopify-import-${shopifyProduct.id.toString()}`,
        _type: `product`,
        title: shopifyProduct.title,
        handle: shopifyProduct.handle,
        description: shopifyProduct.body_html.replace(/<\/?[^>]+(>|$)/g, ``)
      };

      if (shopifyProduct?.image?.src) {
        sanityDocument.image = {
          _type: `altImage`,
          _sanityAsset: `image@${shopifyProduct.image.src}`,
          altText: shopifyProduct.title
        };
      } else if (shopifyProduct?.images?.[0]?.src) {
        sanityDocument.image = {
          _type: `altImage`,
          _sanityAsset: `image@${shopifyProduct.images[0].src}`,
          altText: shopifyProduct.title
        };
      }

      sanityDocuments.push(sanityDocument);
    });

    //

    const cacheFile = `${global.exportDirectory}/sanity-documents.json`;
    const writeableData = sanityDocuments.map(JSON.stringify).join(`\n`);

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await fs.writeFile(cacheFile, writeableData, (err) => {
            if (err) {
              throw err;
            }
          });
        } catch (e) {
          reject(e);
        }

        resolve(sanityDocuments);
      })();
    });
  };

  /**
   * -----------------------------------------------------------------------------
   * Upload the resulting documents to Sanity via credentials provided.
   * @return {null}
   */
  upload = (documents) => {
    if (!this.valid()) {
      throw new Error(`Sanity Client has not yet been instantiated`);
    }

    if (!documents?.[0]) {
      throw new Error(`Documents is not iterable`);
    }

    const processDocument = async (document) => {
      return new Promise((resolve, reject) => {
        console.log(`[info] Uploading ${document.title}...`);

        try {
          this.client.createIfNotExists(document).then((response) => {
            // todo: something better than dumb timeouts
            // if (response?.handle) {
            //   console.log(
            //     `[info] Created ${document.title} [${response.handle}]`
            //   );
            // }

            resolve(response);
          });
        } catch (e) {
          reject(e);
        }
      });
    };

    //
    // todo: something better than dumb timeouts

    const promises = [];

    documents.forEach((document, documentIndex) => {
      setTimeout(() => {
        promises.push(processDocument(document));
      }, documentIndex * 500);
    });

    return Promise.all(promises);

    //
    // todo:  queues..?

    // const { default: PQueue } = require(`p-queue`);
    // const queue = new PQueue({
    //   concurrency: 1,
    //   interval: 1000 / 25
    // });
    //
    // ...
  };
}

export default SanityAPI;
