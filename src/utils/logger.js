const SystemLog = require("../models/SystemLog");

async function kayitOlustur(veri) {
  try {
    await SystemLog.create(veri);
  } catch (hata) {
    console.error("[KAYIT HATASI]", hata.message);
  }
}

module.exports = { kayitOlustur };
