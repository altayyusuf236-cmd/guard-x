const fs = require("node:fs");
const path = require("node:path");
function komutlariYukle(client) {
  const root = path.join(__dirname, "..", "commands");
  for (const category of fs.readdirSync(root)) {
    const dir = path.join(root, category);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".js"))) {
      const command = require(path.join(dir, file));
      client.commands.set(command.data.name, command);
    }
  }
}
module.exports = { komutlariYukle };