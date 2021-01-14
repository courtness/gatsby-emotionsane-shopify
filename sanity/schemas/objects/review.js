export default {
  name: `review`,
  title: `Review`,
  type: `object`,
  fields: [
    {
      name: `name`,
      title: `Customer Name`,
      type: `string`,
      validation: (Rule) => Rule.required()
    },
    {
      name: `location`,
      title: `Location`,
      type: `string`,
      validation: (Rule) => Rule.required()
    },
    {
      name: `date`,
      title: `Date`,
      type: `string`,
      validation: (Rule) => Rule.required()
    },
    {
      name: `rating`,
      title: `Rating`,
      type: `number`,
      validation: (Rule) => Rule.integer().min(0).max(5),
      description: `Rating out of 5`
    },
    {
      name: `title`,
      title: `Title`,
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
      title: `title`,
      name: `name`,
      rating: `rating`
    },
    prepare: ({ name, rating, title }) => {
      return {
        title: `${title} (${name} - ${rating}/5)`
      };
    }
  }
};
