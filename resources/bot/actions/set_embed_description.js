export default {
  name: 'Set Embed Description',
  section: 'Embed Message',

  init: function () {
    const { glob, document } = this;

    glob.refreshVariableList(document.getElementById('storage'));
  },

  /** @this {import("../utils/Actions.js").default} */
  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    const embed = this.getVariable(storage, varName, cache);
    if (embed && embed.setDescription) {
      embed.setDescription(this.evalMessage(data.message, cache));
    } else if (!embed) {
      this.displayError(data, cache, `Embed not found.`);
    } else if (!embed.setDescription) {
      this.displayError(
        data,
        cache,
        `Variable does not have "setDescription" option.`
      );
    }
    this.callNextAction(cache);
  },

  mod: function () {},
};
