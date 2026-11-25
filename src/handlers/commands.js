const fs = require("node:fs");
const path = require("node:path");

function komutlariYukle(client) {
  const anaDizin = path.join(__dirname, "..", "commands");

  for (const kategori of fs.readdirSync(anaDizin)) {
    const kategoriYolu = path.join(anaDizin, kategori);
    if (!fs.statSync(kategoriYolu).isDirectory()) continue;

    for (const dosya of fs.readdirSync(kategoriYolu).filter(f => f.endsWith(".js"))) {
      const komut = require(path.join(kategoriYolu, dosya));
      if (!komut.data || typeof komut.execute !== "function") {
        console.warn(`[KOMUT] Geçersiz komut dosyası: ${dosya}`);
        continue;
      }
      client.commands.set(komut.data.name, komut);
    }
  }

  console.log(`[KOMUT] ${client.commands.size} komut yüklendi.`);
}

module.exports = { komutlariYukle };
