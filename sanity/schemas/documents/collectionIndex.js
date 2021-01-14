export default {
  name: `collectionIndex`,
  title: `Collection Index`,
  type: `document`,
  description: `The master collections page [/collections].`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) => Rule.required()
    }
  ]
};
