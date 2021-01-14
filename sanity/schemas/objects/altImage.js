export default {
  name: `altImage`,
  title: `Image`,
  type: `image`,
  fields: [
    {
      name: `altText`,
      title: `Descriptive Text`,
      type: `string`,
      description: `Important for accessibility.`,
      options: {
        isHighlighted: true
      }
    }
  ]
};
