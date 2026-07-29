export default {
  stackbitVersion: '~0.6.0',
  sitemaps: [
    {
      title: 'Home',
      url: '/',
    },
  ],
  models: {
    page: {
      type: 'page',
      label: 'Page',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Page title',
          default: 'A clearer path to understanding.',
        },
        {
          type: 'string',
          name: 'heroHeadline',
          label: 'Hero headline',
          default: 'A clearer path to understanding.',
        },
        {
          type: 'text',
          name: 'heroSubtitle',
          label: 'Hero subtitle',
          default:
            'Students and mentors connected through knowledge, experience, and the quiet confidence that comes from learning together.',
        },
      ],
    },
  },
  pages: [
    {
      type: 'page',
      urlPath: '/',
      model: 'page',
    },
  ],
}
