module.exports = {
  name: 'Find Custom Emoji',
  section: 'Emoji Control',

  form: {
    info: {
      type: 'select',
      options: [
        { label: 'Emoji ID', value: '0' },
        { label: 'Emoji Name', value: '1' },
      ],
      title: 'Source Field',
      inline: true,
    },
    emojiId: {
      type: 'text',
      title: 'ID',
      if: {
        field: 'info',
        equals: 0,
      },
      inline: true,
    },
    emojiName: {
      type: 'text',
      title: 'Name',
      if: {
        field: 'info',
        equals: 1,
      },
      inline: true,
    },
    storage: {
      type: 'storage',
      title: 'Store In',
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
  },
}; // End of module
