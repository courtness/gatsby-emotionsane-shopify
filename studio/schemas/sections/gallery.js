export default {
  name: `gallery`,
  title: `Gallery`,
  type: `object`,
  fields: [
    {
      name: `gallery`,
      title: `Gallery`,
      type: `array`,
      of: [{ type: `altImage` }],
      options: {
        layout: `grid`
      }
    }
  ]
};
