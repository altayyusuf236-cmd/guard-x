const mongoose = require("mongoose");

async function veritabaninaBaglan(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000
  });
  console.log("[VERİTABANI] MongoDB bağlantısı kuruldu.");
}

module.exports = { veritabaninaBaglan };
