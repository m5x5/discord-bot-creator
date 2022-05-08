module.exports = {
  name: 'Set Embed Description',
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
      title: 'Description',
    },
  },
};
