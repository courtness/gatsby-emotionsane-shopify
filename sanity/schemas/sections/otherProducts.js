export default {
  name: `otherProducts`,
  title: `Other Products`,
  type: `object`,
  fields: [
    {
      name: `products`,
      title: `Products`,
      type: `array`,
      of: [{ type: `product` }]
    }
  ]
};
