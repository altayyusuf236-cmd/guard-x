require("dotenv").config();

function gerekli(deger, ad) {
  if (!deger || !deger.trim()) {
    throw new Error(`${ad} .env dosyasında tanımlanmamış.`);
  }
  return deger.trim();
}

const sahipler = (process.env.OWNER_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

module.exports = {
  token: gerekli(process.env.DISCORD_TOKEN, "DISCORD_TOKEN"),
  clientId: gerekli(process.env.CLIENT_ID, "CLIENT_ID"),
  mongoUri: gerekli(process.env.MONGODB_URI, "MONGODB_URI"),
  ownerIds: sahipler,
  testGuildId: process.env.TEST_GUILD_ID || "",
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || "development"
};
