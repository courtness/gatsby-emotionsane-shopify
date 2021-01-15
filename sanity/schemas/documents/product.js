export default {
  name: `product`,
  title: `Products`,
  type: `document`,
  description: `This is an individual product`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) => Rule.required()
    },
    {
      name: `handle`,
      title: `Handle`,
      type: `string`,
      validation: (Rule) => Rule.required(),
      description: `Must match the Shopify handle, which you can find at the end of the url in the SEO section at the bottom of a Shopify product page in the dashboard, e.g. for /products/product-name, the handle here should be product-name.`
    },
    {
      name: `description`,
      title: `Product Description`,
      type: `text`,
      validation: (Rule) => Rule.required()
    },
    {
      name: `collections`,
      title: `Collections`,
      type: `array`,
      of: [{ type: `reference`, to: [{ type: `collection` }] }]
    },
    {
      name: `priority`,
      title: `Priority`,
      type: `number`
    },
    {
      name: `image`,
      title: `Grid / Cart Image`,
      type: `altImage`,
      validation: (Rule) => Rule.required(),
      description: `Displayed when the product is displayed in a grid or a tray like a cart.`
    },
    {
      name: `gallery`,
      title: `Product Gallery`,
      type: `array`,
      of: [{ type: `altImage` }],
      options: {
        layout: `grid`
      }
    },
    {
      name: `related`,
      title: `Related Products`,
      type: `array`,
      of: [{ type: `reference`, to: [{ type: `product` }] }]
    }
  ],
  preview: {
    select: {
      title: `title`,
      media: `image`
    }
  }
};
