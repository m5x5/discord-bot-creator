export default {
  name: 'Add Reaction',
  section: 'Messaging',
  fields: ['storage', 'varName', 'emoji'],

  /** @this {import("../utils/Actions.js").default} */
  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = +data.storage;
    const varName = this.evalMessage(data.varName, cache);
    const message = this.getMessage(storage, varName, cache);

    const type = +data.emojiStorage;
    let emoji;
    if (type === 0) {
      emoji = this.evalMessage(data.emoji, cache);
    } else if (type === 1) {
      if (message?.guild) {
        const emojis = await message.guild.emojis.fetch();
        emoji = emojis.find(
          (e) => e.name === this.evalMessage(data.emojiName, cache)
        );
        if (!emoji) {
          this.displayError(data, cache, 'Emoji not found.');
        }
      } else {
        emoji = this.getDBM().Bot.bot.emojis.cache.find(
          (e) => e.name === this.evalMessage(data.emojiName, cache)
        );
      }
    } else {
      emoji = this.getVariable(
        type,
        this.evalMessage(data.varName3, cache),
        cache
      );
    }

    if (Array.isArray(message)) {
      this.callListFunc(message, 'react', [emoji]).then(() =>
        this.callNextAction(cache)
      );
    } else if (emoji && message && message.react) {
      message
        .react(emoji)
        .then(() => this.callNextAction(cache))
        .catch((err) => {
          this.displayError(data, cache, err.message);
        });
    } else {
      this.callNextAction(cache);
    }
  },
};
