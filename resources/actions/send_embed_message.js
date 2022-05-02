module.exports = {
  name: 'Send Embed Message',
  section: 'Embed Message',

  form: {
    storage: {
      type: 'storage',
      title: 'Source Embed Object',
      inline: true,
    },
    varName: {
      type: 'variable',
      title: 'Variable Name',
      inline: 'true',
    },
    channel: {
      type: 'channel',
      title: 'Send To',
      inline: true,
    },
    varName2: {
      type: 'variable',
      title: 'Variable Name',
      placeholder: 'Variable Name',
      inline: true,
      if: {
        field: 'channel',
        greaterThan: 1,
      },
    },
    storage3: {
      type: 'storage',
      title: 'Store Message',
      inline: true,
    },
    varName3: {
      type: 'variable',
      title: 'Variable Name',
      placeholder: 'Variable Name',
      inline: true,
      if: {
        field: 'storage3',
        greaterThan: 0,
      },
    },
    iffalse: {
      type: 'iffalse',
      title: 'If False',
      description: 'If the message is not sent, run this code.',
    },
    iffalseVal: {
      type: 'text',
      title: 'If False Value',
      placeholder: 'Value',
    },
    messageContent: {
      type: 'textarea',
      title: 'Message Content',
      inline: true,
    },
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage3, 10) !== varType) return;
    return [data.varName3, 'Message'];
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const embed = this.getVariable(storage, varName, cache);
    if (!embed) return this.callNextAction(cache);

    const messageContent = this.evalMessage(data.messageContent, cache);
    const channel = parseInt(data.channel, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const varName3 = this.evalMessage(data.varName3, cache);
    const storage3 = parseInt(data.storage3, 10);
    const target = this.getSendTarget(channel, varName2, cache);

    if (target && target.send) {
      target
        .send(messageContent, { embed })
        .then((msg) => {
          if (msg && varName3) this.storeValue(msg, storage3, varName3, cache);
          this.callNextAction(cache);
        })
        .catch(() => this.executeResults(false, data, cache));
    } else {
      this.callNextAction(cache);
    }
  },

  mod() {},
};
