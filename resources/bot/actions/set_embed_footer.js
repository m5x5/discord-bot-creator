export default {
  name: 'Set Embed Footer',
  section: 'Embed Message',

  /** @this {import("../utils/Actions.js").default} */
  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const embed = this.getVariable(storage, varName, cache);

    if (embed && embed.setFooter) {
      embed.setFooter(
        this.evalMessage(data.message, cache),
        this.evalMessage(data.footerIcon, cache)
      );
    } else if (!embed) {
      this.displayError(data, cache, 'No embed found.');
    } else if (!embed.setFooter) {
      this.displayError(
        data,
        cache,
        'No "setFooter" method found on variable.'
      );
    }
    this.callNextAction(cache);
  },
};
