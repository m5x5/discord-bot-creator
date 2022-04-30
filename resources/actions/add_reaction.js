module.exports = {
  name: 'Add Reaction',
  section: 'Messaging',
  fields: ['storage', 'varName', 'emoji'],

  form: {
    storage: {
      type: 'storage',
      title: 'Message',
    },
    varName: {
      type: 'variable',
      title: 'Message Variable',
      description: 'The variable to store the message in.',
      placeholder: 'Message Variable',
      if: {
        field: 'storage',
        greaterThan: '0',
      },
    },
    emojiStorage: {
      type: 'text',
      title: 'Emoji',
    },
    emoji: {},
    emojiName: {
      type: 'text',
      title: 'Emoji Name',
    },
    varName3: {
      type: 'emoji',
      title: 'Emoji Location',
    },
  },
}; // End of module
