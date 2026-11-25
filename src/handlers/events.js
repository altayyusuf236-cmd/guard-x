const fs = require("node:fs");
const path = require("node:path");

function olaylariYukle(client) {
  const dizin = path.join(__dirname, "..", "events");

  for (const dosya of fs.readdirSync(dizin).filter(f => f.endsWith(".js"))) {
    const olay = require(path.join(dizin, dosya));
    const calistir = (...args) => olay.execute(...args, client);

    if (olay.once) client.once(olay.name, calistir);
    else client.on(olay.name, calistir);
  }

  console.log("[OLAY] Olay dinleyicileri yüklendi.");
}

module.exports = { olaylariYukle };
