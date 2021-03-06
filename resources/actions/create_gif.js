module.exports = {
  name: "Create GIF",
  section: "Image Editing",

  subtitle(data) {
    return `${data.url}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "GIF"];
  },

  fields: ["url", "storage", "varName"],

  html(isEvent, data) {
    return `
<div>
  Local/Web URL:<br>
  <input id="url" class="round" type="text" value="resources/" style="float: left; width: 504px;">
</div><br><br>
<div style="padding-top: 10px;">
  <div style="float: left; width: 35%;">
    Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
    Variable Name:<br>
    <input id="varName" class="round" type="text"><br>
  </div>
</div>`;
  },

  init() {},

  action(cache) {
    const data = cache.actions[cache.index];
    const obj = this.evalMessage(data.url, cache);

    let gif;
    gif = !obj.startsWith("http") ? this.getLocalFile(obj) : obj;

    if (!gif.includes(".gif")) return this.callNextAction(cache);

    const varName = this.evalMessage(data.varName, cache);
    const storage = parseInt(data.storage, 10);
    this.storeValue(gif, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
