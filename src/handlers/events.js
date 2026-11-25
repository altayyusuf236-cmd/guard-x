const fs = require("node:fs");
const path = require("node:path");

function olaylariYukle(client) {
  const dir = path.join(__dirname, "..", "events");
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".js"))) {
    const event = require(path.join(dir, file));
    const listener = (...args) => event.execute(...args, client);
    if (event.once) client.once(event.name, listener);
    else client.on(event.name, listener);
  }
}
module.exports = { olaylariYukle };