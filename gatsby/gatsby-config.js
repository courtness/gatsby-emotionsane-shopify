// module.exports = {
//   flags : { DEV_SSR: true },
//   plugins: [...]
// }

require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

function trackingPlugins() {
  const plugins = [];

  if (process.env.GATSBY_BUGHERD_ID) {
    plugins.push({
      resolve: `gatsby-plugin-bugherd`,
      options: {
        key: process.env.GATSBY_BUGHERD_ID
      }
    });
  }

  if (process.env.GATSBY_GA_ID) {
    plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GA_ID,
        head: true,
        anonymize: true
      }
    });
  }

  if (process.env.GATSBY_GTM_ID) {
    plugins.push({
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GATSBY_GTM_ID,
        includeInDevelopment: true,
        defaultDataLayer: {
          platform: `gatsby`
        }
      }
    });
  }

  if (process.env.GATSBY_FBPIXEL_ID) {
    plugins.push({
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.GATSBY_FBPIXEL_ID
      }
    });
  }

  if (process.env.GATSBY_SEGMENT_WRITE_KEY) {
    plugins.push({
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: process.env.GATSBY_SEGMENT_WRITE_KEY,
        devKey: process.env.GATSBY_SEGMENT_WRITE_KEY,
        trackPage: false
      }
    });
  }

  if (process.env.GATSBY_HOTJAR_ID && process.env.GATSBY_HOTJAR_VERSION) {
    plugins.push({
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: process.env.GATSBY_HOTJAR_ID,
        sv: process.env.GATSBY_HOTJAR_VERSION
      }
    });
  }

  return plugins;
}

//

function shopifySources() {
  const sources = [];

  if (
    process.env.GATSBY_SHOPIFY_STORE &&
    process.env.GATSBY_SHOPIFY_API_KEY &&
    process.env.GATSBY_SHOPIFY_PASSWORD
  ) {
    const endpoint = `https://${process.env.GATSBY_SHOPIFY_API_KEY}:${process.env.GATSBY_SHOPIFY_PASSWORD}@${process.env.GATSBY_SHOPIFY_STORE}.myshopify.com/admin/products.json`;

    sources.push({
      resolve: `gatsby-source-apiserver`,
      options: {
        url: endpoint,
        method: `get`,
        headers: {
          "Content-Type": `application/json`
        },
        name: `shopifyAdminProduct`
      }
    });
  }

  if (
    process.env.GATSBY_SHOPIFY_STORE &&
    process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN
  ) {
    sources.push({
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: process.env.GATSBY_SHOPIFY_STORE,
        accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
        verbose: true,
        paginationSize: 250,
        includeCollections: [`shop`]
      }
    });
  }

  return sources;
}

//

module.exports = {
  siteMetadata: {
    title: `Hereafter`,
    titleTemplate: `%s - Hereafter`,
    description: `Hereafter Online`,
    keywords: `store,ecommerce`,
    author: `dan@loveandmoney.agency`,
    image: `/images/share.svg`,
    fbAppId: ``,
    siteUrl: `https://hereafter-gatsby.netlify.app`,
    twitterUsername: `@twitter`
  },
  plugins: [
    ...trackingPlugins(),
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hereafter`,
        short_name: `hereafter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/assets/images/favicon.png`
      }
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true,
        whitelistPatterns: [/gatsby-/, /glide/]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets/images`,
        name: `images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: `pages`
      }
    },
    ...shopifySources(),
    {
      resolve: `gatsby-plugin-netlify-functions`,
      options: {
        functionsSrc: `${__dirname}/src/lambda`,
        functionsOutput: `${__dirname}/lambda`
      }
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN
      }
    },
    `gatsby-plugin-netlify`
  ]
};
