export default {
  name: `simpleText`,
  title: `Simple Text`,
  type: `object`,
  fields: [
    {
      name: `heading`,
      title: `Heading`,
      type: `string`
    },
    {
      name: `content`,
      title: `Content`,
      type: `text`
    }
  ],
  preview: {
    select: {
      heading: `heading`
    },
    prepare: ({ heading }) => {
      return {
        title: `[Simple Text] ${heading}`
      };
    }
  }
};
