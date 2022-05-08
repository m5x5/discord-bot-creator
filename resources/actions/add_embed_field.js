module.exports = {
  name: 'Add Embed Field',
  section: 'Embed Message',

  form: {
    storage: {
      type: 'storage',
      title: 'Storage',
      placeholder: 'Enter a name for the variable.',
      inline: true,
    },
    varName: {
      type: 'variable',
      variableType: 'embed',
      title: 'Variable Name',
      placeholder: 'Variable Name',
      inline: true,
      if: {
        field: 'storage',
        greaterThan: 0,
      },
    },
    fieldName: {
      type: 'text',
      title: 'Field Name',
      description: 'Name of the field that you want to add to the embed.',
    },
    message: {
      type: 'text',
      title: 'Content',
      description: 'The content of the field.',
    },
    inline: {
      type: 'checkbox',
      title: 'Inline',
      description: 'Whether or not the field should be displayed inline.',
    },
  },

  subtitle(data) {
    return `${data.name} - ${data.message}`;
  },

  fields: ['storage', 'varName', 'fieldName', 'message', 'inline'],

  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const embed = this.getVariable(storage, varName, cache);
    const name = this.evalMessage(data.fieldName, cache);
    const message = this.evalMessage(data.message, cache);

    const inline = Boolean(data.inline === '0');
    if (embed && embed.addField) {
      embed.addField(name || '\u200B', message || '\u200B', inline);
    }
    this.callNextAction(cache);
  },
};
