export default {
  name: 'Create Embed Message',
  section: 'Embed Message',

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Embed Object'];
  },

  /** @this {import("../utils/Actions.js").default} */
  action(cache) {
    const evalMessage = (s) => this.evalMessage(s, cache);
    const data = cache.actions[cache.index];
    const { DiscordJS } = this.getDBM();
    const embed = new DiscordJS.MessageEmbed();
    const text = evalMessage(data.text);
    const year = +evalMessage(data.year);
    const month = +evalMessage(data.month);
    const day = +evalMessage(data.day);
    const hour = +evalMessage(data.hour);
    const minute = +evalMessage(data.minute);
    const second = +evalMessage(data.second);
    const timestamp = +evalMessage(data.timestamp);
    const storage = +data.storage;
    const varName = evalMessage(data.varName);

    if (!varName) return callNextAction(cache);

    if (data.title) {
      embed.setTitle(evalMessage(data.title));
    }

    if (data.url) {
      embed.setURL(evalMessage(data.url));
    }

    if (data.author) {
      embed.setAuthor({
        name: evalMessage(data.author),
        iconURL: evalMessage(data.authorIcon),
        url: evalMessage(data.authorUrl),
      });
    }

    if (data.color) {
      embed.setColor(evalMessage(data.color));
    }

    if (data.imageUrl) {
      embed.setImage(evalMessage(data.imageUrl));
    }

    if (data.thumbUrl) {
      embed.setThumbnail(evalMessage(data.thumbUrl));
    }

    switch (timestamp) {
      // No Timestamp
      case 0:
        break;
      // Current Timestamp
      case 1:
        embed.setTimestamp();
        break;
      // String Timestamp
      case 2:
        if (text.length > 0) {
          embed.setTimestamp(new Date(`${text}`));
        } else {
          embed.setTimestamp();
          console.log(
            'Invalid UTC timestamp! Changed from [String Timestamp] to [Current Timestamp].'
          );
        }
        break;
      // Custom Timestamp
      case 3:
        embed.setTimestamp(
          new Date(
            year || null,
            month || null,
            day || null,
            hour || null,
            minute || null,
            second || null
          )
        );
        break;
      default:
        embed.setTimestamp();
        break;
    }

    this.storeValue(embed, storage, varName, cache);
    this.callNextAction(cache);
  },
};
