module.exports = {
  name: 'Create Image Attachment',
  section: 'Embed Message',

  fields: [],
  form: {
    url: {
      type: 'text',
      title: 'Image URL',
    },
    filename: {
      type: 'text',
      title: 'Image Name',
      placeholder: 'image.png',
      description: 'The name with which the image will be saved in the server.',
    },
    storage: {
      type: 'storage',
      variant: 1,
      title: 'Storage',
      inline: true,
    },
    varName: {
      type: 'text',
      title: 'Variable Name',
      placeholder: 'Embed Variable Name',
      inline: true,
      if: {
        field: 'embedstorage',
        greaterThan: 0,
      },
    },
  },
};
