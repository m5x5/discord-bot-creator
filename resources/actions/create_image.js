module.exports = {
  name: 'Create Image',
  section: 'Image Editing',
  form: {
    url: {
      type: 'text',
      title: 'Local / Web URL',
      placeholder: 'resources/',
    },
    storage: {
      type: 'storage',
      title: 'Store In',
      variant: 1,
      inline: true,
    },
    varName: {
      type: 'text',
      title: 'Variable Name',
      placeholder: 'image',
      inline: true,
      if: {
        field: 'storage',
        greaterThan: 0,
      },
    },
  },
}; // End of module
