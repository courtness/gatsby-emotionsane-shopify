export default {
  name: `reviews`,
  title: `Reviews`,
  type: `object`,
  fields: [
    {
      name: `reviews`,
      title: `Reviews`,
      type: `array`,
      of: [{ type: `review` }]
    }
  ],
  preview: {
    select: {
      reviews: `reviews`
    },
    prepare: ({ reviews }) => {
      return {
        title: `[Reviews] ${reviews.length} Reviews`
      };
    }
  }
};
