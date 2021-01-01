export default {
  name: `collection`,
  title: `Collection`,
  type: `document`,
  description: `A collection containing a set of products from Shopify.`,
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
      validation: (Rule) => Rule.required()
    },
    {
      name: `priority`,
      title: `Priority`,
      type: `number`
    },
    {
      name: `image`,
      title: `Grid Image`,
      type: `altImage`,
      validation: (Rule) => Rule.required(),
      description: `Displayed when the collection is displayed in a grid.`
    },
    {
      name: `description`,
      title: `Collection Description`,
      type: `text`,
      validation: (Rule) => Rule.required()
    }
  ]
};
