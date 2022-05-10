export default {
  name: 'Create Image Attachment',
  section: 'Embed Message',

  /** @this {import("../utils/Actions.js").default} */
  async action(cache) {
    const data = cache.actions[cache.index];

    const url = this.evalMessage(data.url, imageVarName, cache);

    const filename = data.filename || 'image.png';

    const DBM = this.getDBM();
    const { Images } = DBM;

    const image = this.getImage(url);
    const buffer = await Images.createBuffer(image);
    const attachment = new DBM.DiscordJS.MessageAttachment(buffer, filename);

    const storage = +data.storage;
    const varName = this.evalMessage(data.varName, cache);

    this.storeValue(attachment, storage, varName, cache);
    this.callNextAction(cache);
  },
};
