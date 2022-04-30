export default {
  name: 'Find Custom Emoji',

  section: 'Emoji Control',

  subtitle: function (data) {
    const info = ['Emoji ID', 'Emoji Name'];
    return `Find Emoji by ${info[parseInt(data.info)]}`;
  },

  variableStorage: function (data, varType) {
    const type = parseInt(data.storage);
    if (type !== varType) return;
    return [data.varName, 'Emoji'];
  },

  fields: ['info', 'find', 'storage', 'varName'],

  /** @this {import("../utils/Actions.js").default} */
  action(cache) {
    const data = cache.actions[cache.index];
    const bot = this.getDBM().Bot.bot;
    const info = +data.info;
    const find =
      this.evalMessage(data.emojiId, cache) ||
      this.evalMessage(data.emojiName, cache);
    const emojis = bot.emojis.cache;
    let result;
    switch (info) {
      case 0:
        result = emojis.get(find);
        break;
      case 1:
        result = emojis.find((e) => e.name === find);
        break;
      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    } else {
      this.displayError(data, cache, 'Emoji not found.');
    }
    this.callNextAction(cache);
  },

  mod: function () {},
};
