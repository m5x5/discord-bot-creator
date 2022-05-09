module.exports = {
  name: 'Attach Image To Embed',
  section: 'Embed Message',

  form: {
    embedstorage: {
      type: 'storage',
      variant: 1,
      title: 'Embed Storage',
      inline: true,
    },
    embedvarName: {
      type: 'text',
      title: 'Variable Name',
      placeholder: 'Embed Variable Name',
      inline: true,
      if: {
        field: 'embedstorage',
        greaterThan: 0,
      },
    },
    imagestorage: {
      type: 'storage',
      title: 'Image Storage',
    },
    imagevarName: {
      type: 'text',
      title: 'Variable Name',
      if: {
        field: 'imagestorage',
        greaterThan: 0,
      },
    },
    filename: {
      type: 'text',
      title: 'Filename',
      placeholder: 'image.png',
    },
  },

  action(cache) {
    const data = cache.actions[cache.index];

    const embedstorage = parseInt(data.embedstorage, 10);
    const embedvarName = this.evalMessage(data.embedvarName, cache);
    const embed = this.getVariable(embedstorage, embedvarName, cache);

    const imagestorage = parseInt(data.imagestorage, 10);
    const imagevarName = this.evalMessage(data.imagevarName, cache);
    const image = this.getVariable(imagestorage, imagevarName, cache);

    const filename = data.filename || 'image.png';

    const DBM = this.getDBM();
    const { Images } = DBM;

    Images.createBuffer(image).then((buffer) => {
      const attachment = new DBM.DiscordJS.MessageAttachment(buffer, filename);
      embed.attachFiles([attachment]);
      this.callNextAction(cache);
    });
  },
};
