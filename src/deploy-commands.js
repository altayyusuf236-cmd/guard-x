require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const { clientId, token, testGuildId } = require("./config");

const komutlar = [];
const anaDizin = path.join(__dirname, "commands");

for (const kategori of fs.readdirSync(anaDizin)) {
  const kategoriYolu = path.join(anaDizin, kategori);
  if (!fs.statSync(kategoriYolu).isDirectory()) continue;

  for (const dosya of fs.readdirSync(kategoriYolu).filter(f => f.endsWith(".js"))) {
    const komut = require(path.join(kategoriYolu, dosya));
    komutlar.push(komut.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(`[KOMUT] ${komutlar.length} komut Discord'a yükleniyor...`);

    if (testGuildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, testGuildId), { body: komutlar });
      console.log("[KOMUT] Komutlar test sunucusuna yüklendi.");
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body: komutlar });
      console.log("[KOMUT] Komutlar global olarak yüklendi. Yayılması zaman alabilir.");
    }
  } catch (hata) {
    console.error("[KOMUT YÜKLEME HATASI]", hata);
    process.exit(1);
  }
})();
