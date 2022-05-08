module.exports = {
  name: 'Create Embed Message',
  section: 'Embed Message',

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Embed Object'];
  },

  form: {
    title: {
      type: 'text',
      title: 'Title',
      placeholder: 'Empty for no title',
    },
    author: {
      type: 'text',
      title: 'Author Name',
      placeholder: 'Empty for no author',
    },
    color: {
      type: 'color',
      title: 'Embed Color',
    },
    url: {
      type: 'text',
      title: 'URL',
      placeholder: 'Blank for none',
    },
    authorUrl: {
      type: 'text',
      title: 'Author Link URL',
      placeholder: 'Blank for none',
    },
    authorIcon: {
      type: 'text',
      title: 'Author Icon URL',
      placeholder: 'Blank for none',
    },
    imageUrl: {
      type: 'text',
      title: 'Image URL',
      placeholder: 'Blank for none',
    },
    thumbUrl: {
      type: 'text',
      title: 'Thumbnail URL',
      placeholder: 'Blank for none',
    },
    timestamp: {
      type: 'select',
      title: 'Timestamp',
      options: [
        { label: 'No Timestamp', value: 0 },
        { label: 'Current Timestamp', value: 1 },
        { label: 'String Timestamp', value: 2 },
        { label: 'Custom Timestamp', value: 3 },
      ],
    },
    year: {
      type: 'text',
      title: 'Year',
      inline: true,
      if: {
        field: 'timestamp',
        equals: 3,
      },
    },
    month: {
      type: 'text',
      title: 'Month',
      inline: true,
      if: {
        field: 'timestamp',
        equals: 3,
      },
    },
    day: {
      type: 'text',
      title: 'Day',
      inline: true,
      if: {
        field: 'timestamp',
        equals: 3,
      },
    },
    hour: {
      type: 'text',
      title: 'Hour',
      inline: true,
      if: {
        field: 'timestamp',
        equals: 3,
      },
    },
    minute: {
      type: 'text',
      title: 'Minute',
      inline: true,
      if: {
        field: 'timestamp',
        equals: 3,
      },
    },
    second: {
      type: 'text',
      title: 'Second',
      inline: true,
      if: {
        field: 'timestamp',
        equals: 3,
      },
    },
    text: {
      type: 'text',
      title: 'String Timestamp',
      inline: false,
      if: {
        field: 'timestamp',
        equals: 2,
      },
    },
    note1: {
      type: 'note',
      value:
        'This setting works with time formats like "March 3, 2020" or "3600000" (1 hour in ms).',
    },
    note2: {
      type: 'note',
      value: `Correct input:
Year: [2019] Month: [1] Day: [1] Hour: [ ] Minute: [ ] Second: [ ]
Incorrect input:
Year: [2019] Month: [1] Day: [1] Hour: [ ] Minute: [1] Second: [ ]`,
    },
  },
};
