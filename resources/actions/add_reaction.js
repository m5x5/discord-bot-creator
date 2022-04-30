module.exports = {
  name: 'Add Reaction',
  section: 'Messaging',
  fields: ['storage', 'varName', 'emoji'],

  form: {
    storage: {
      type: 'storage',
      title: 'Message',
      inline: true,
    },
    varName: {
      type: 'variable',
      title: 'Message Variable',
      placeholder: 'Message Variable',
      inline: true,
      if: {
        field: 'storage',
        greaterThan: '0',
      },
    },
    emojiStorage: {
      type: 'emoji',
      title: 'Emoji Type',
      inline: true,
    },
    emoji: {
      type: 'text',
      title: 'Emoji',
      if: {
        field: 'emojiStorage',
        equals: 0,
      },
      inline: true,
    },
    emojiName: {
      type: 'text',
      title: 'Emoji Name',
      if: {
        field: 'emojiStorage',
        equals: 1,
      },
      inline: true,
    },
    varName3: {
      type: 'text',
      title: 'Variable Name',
      description: 'The variable name of the emoji.',
      if: {
        field: 'emojiStorage',
        greaterThan: 1,
      },
      inline: true,
    },
  },
}; // End of module
