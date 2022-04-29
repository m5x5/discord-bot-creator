export default {
  name: 'Edit Message',
  section: 'Messaging',

  /** @this {import("../utils/Actions.js").default} */
  action(cache) {
    const data = cache.actions[cache.index];

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const message = this.getMessage(storage, varName, cache);

    const content = this.evalMessage(data.message, cache);

    const storage2 = parseInt(data.storage2, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const embed = this.getVariable(storage2, varName2, cache);

    console.log({ storage, varName, message, content });

    if (Array.isArray(message)) {
      this.callListFunc(message, 'edit', [content, embed]).then(() => {
        this.callNextAction(cache);
      });
    } else if (message && message.edit && !message.deleted) {
      console.log('message is not an array');
      message
        .edit(content, embed)
        .then(() => {
          console.log('edited');
          this.callNextAction(cache);
        })
        .catch((err) => this.displayError(data, cache, err));
    } else {
      console.log('message is not an array or is deleted');
      this.callNextAction(cache);
    }
  },
};
