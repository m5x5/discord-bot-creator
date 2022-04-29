module.exports = {
  name: 'Edit Message',
  section: 'Messaging',

  form: {
    storage: {
      type: 'message',
      title: 'Message Object',
      description: 'The message to edit.',
      inline: true,
      required: true,
    },
    varName: {
      type: 'variable',
      title: 'Variable Name',
      placeholder: 'Variable Name',
      if: {
        field: 'storage',
        greaterThan: 0,
      },
      inline: true,
    },
    message: {
      type: 'textarea',
      title: 'New Content',
      required: true,
    },
    storage2: {
      type: 'storage',
      title: 'Embed Object',
      description: 'The embed to add to the message.',
      inline: true,
    },
    varName2: {
      type: 'variable',
      title: 'Variable Name',
      placeholder: 'Variable Name',
    },
  },
};
