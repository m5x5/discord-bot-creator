module.exports = {
  name: 'Set Embed Footer',
  section: 'Embed Message',

  form: {
    storage: {
      type: 'storage',
      title: 'Storage',
      inline: true,
    },
    varName: {
      type: 'text',
      title: 'Variable Name',
      inline: true,
      if: {
        field: 'storage',
        greaterThan: 0,
      },
    },
    message: {
      type: 'text',
      title: 'Footer Text',
      placeholder: 'Footer Text',
    },
    footerIcon: {
      type: 'text',
      title: 'Footer Icon URL',
      placeholder: 'https://.../icon.png',
    },
  },
};
