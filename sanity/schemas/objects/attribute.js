export default {
  name: `attribute`,
  title: `Attribute`,
  type: `object`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) => Rule.required()
    },
    {
      name: `content`,
      title: `Content`,
      type: `text`,
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: `title`
    },
    prepare: ({ title }) => {
      return {
        title: `${title}`
      };
    }
  }
};
