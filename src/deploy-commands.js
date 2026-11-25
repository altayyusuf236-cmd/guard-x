require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const { clientId, token, testGuildId } = require("./config");

const komutlar = [];
const root = path.join(__dirname, "commands");
for (const kategori of fs.readdirSync(root)) {
  const dir = path.join(root, kategori);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const dosya of fs.readdirSync(dir).filter(f => f.endsWith(".js"))) {
    const komut = require(path.join(dir, dosya));
    komutlar.push(komut.data.toJSON());
  }
}
const rest = new REST({ version: "10" }).setToken(token);
(async () => {
  try {
    console.log(`[KOMUT] ${komutlar.length} komut yükleniyor...`);
    if (testGuildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, testGuildId), { body: komutlar });
      console.log("[KOMUT] Test sunucusu komutları güncellendi.");
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body: komutlar });
      console.log("[KOMUT] Global komutlar güncellendi.");
    }
  } catch (e) { console.error("[KOMUT HATASI]", e); process.exit(1); }
})();