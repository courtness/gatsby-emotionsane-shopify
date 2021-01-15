export default {
  widgets: [
    {
      name: `document-list`,
      options: {
        title: `Last edited documents`,
        order: `_updatedAt desc`
      },
      layout: {
        width: `small`,
        height: `small`
      }
    },
    {
      name: `project-users`,
      layout: {
        width: `small`,
        height: `small`
      }
    },
    // {
    //   name: `netlify`,
    //   options: {
    //     title: `My Netlify deploys`,
    //     sites: [
    //       {
    //         title: `Gatsby on Netlify`,
    //         apiId: ``,
    //         buildHookId: ``,
    //         name: ``
    //       }
    //     ]
    //   },
    //   layout: {
    //     width: `small`,
    //     height: `small`
    //   }
    // }
  ]
};
