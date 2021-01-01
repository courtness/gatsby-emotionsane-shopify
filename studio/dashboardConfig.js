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
    {
      name: `netlify`,
      options: {
        title: `My Netlify deploys`,
        sites: [
          {
            title: `Hereafter`,
            apiId: `86cb5b7d-006d-4032-8dfb-46b05b0e98dc`,
            buildHookId: `5fd2d692bab0b44a4b705b34`,
            name: `hereafter-sanity`
          }
        ]
      },
      layout: {
        width: `small`,
        height: `small`
      }
    }
  ]
};
