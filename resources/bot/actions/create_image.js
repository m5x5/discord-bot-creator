export default {
  name: 'Create Image',

  section: 'Image Editing',

  subtitle: function (data) {
    return `${data.url}`;
  },

  variableStorage: function (data, varType) {
    const type = parseInt(data.storage);
    if (type !== varType) return;
    return [data.varName, 'Image'];
  },

  fields: ['url', 'storage', 'varName'],

  init: function () {},

  /** @this {import("../utils/Actions.js").default} */
  async action(cache) {
    const data = cache.actions[cache.index];
    const Images = this.getDBM().Images;

    const url = this.evalMessage(data.url, cache);
    const image = await Images.getImage(url);
    const varName = this.evalMessage(data.varName, cache);
    const storage = +data.storage;

    this.storeValue(image, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod: function () {},
};
