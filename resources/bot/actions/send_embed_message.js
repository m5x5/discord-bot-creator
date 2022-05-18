export default {
  name: 'Send Embed Message',
  section: 'Embed Message',

  variableStorage(data, varType) {
    if (parseInt(data.storage3, 10) !== varType) return;
    return [data.varName3, 'Message'];
  },

  /** @this {import("../utils/Actions.js").default} */
  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const embed = this.getVariable(storage, varName, cache);
    if (!embed) {
      this.displayError(data, cache, 'Embed Object Not Found');

      return this.callNextAction(cache);
    }

    const attachmentStorage = +data.attachmentStorage;
    const attachmentVarName = data.attachmentVarName;
    const attachment = this.getVariable(
      attachmentStorage,
      attachmentVarName,
      cache
    );
    if (attachmentStorage && !attachment) {
      this.displayError(data, cache, 'Attachment Not Found');
    }

    const messageContent = this.evalMessage(data.messageContent, cache);
    const channel = parseInt(data.channel, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const varName3 = this.evalMessage(data.varName3, cache);
    const storage3 = parseInt(data.storage3, 10);
    const target = this.getSendTarget(channel, varName2, cache);

    if (target?.send) {
      target
        .send({
          content: messageContent || undefined,
          embeds: [embed],
          files: [attachment],
        })
        .then((msg) => {
          if (msg && varName3) this.storeValue(msg, storage3, varName3, cache);
          this.callNextAction(cache);
        })
        .catch((err) => {
          this.displayError(data, cache, err);
          this.executeResults(false, data, cache);
        });
    } else {
      this.displayError(data, cache, 'Send Target Not Found');
      this.callNextAction(cache);
    }
  },
};
