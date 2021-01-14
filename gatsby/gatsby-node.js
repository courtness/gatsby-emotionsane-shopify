/* eslint-disable no-console */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~assets": path.resolve(__dirname, `src/assets`),
        "~components": path.resolve(__dirname, `src/components`),
        "~context": path.resolve(__dirname, `src/context`),
        "~data": path.resolve(__dirname, `src/data`),
        "~node_modules": path.resolve(__dirname, `node_modules`),
        "~utils": path.resolve(__dirname, `src/utils`),
        "~workers": path.resolve(__dirname, `src/workers`)
      }
    }
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type SanityProduct @infer {
      shopifyProduct: ShopifyProduct @link(by: "handle", from: "handle")
    }
  `;

  createTypes(typeDefs);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allSanityProduct {
        edges {
          node {
            handle
            id
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const { allSanityProduct } = result.data;

    allSanityProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/products/${node.handle}`,
        component: path.resolve(`src/templates/product-page.jsx`),
        context: {
          id: node.id
        }
      });
    });

    return true;
  });
};
