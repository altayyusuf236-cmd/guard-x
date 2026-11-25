require("dotenv").config();

function gerekli(deger, ad) {
  if (!deger) throw new Error(`${ad} .env dosyasında tanımlı değil.`);
  return deger;
}

const sahipler = (process.env.OWNER_IDS || "")
  .split(",").map(x => x.trim()).filter(Boolean);

module.exports = {
  token: gerekli(process.env.DISCORD_TOKEN, "DISCORD_TOKEN"),
  clientId: gerekli(process.env.CLIENT_ID, "CLIENT_ID"),
  mongoUri: gerekli(process.env.MONGODB_URI, "MONGODB_URI"),
  ownerIds: sahipler,
  testGuildId: process.env.TEST_GUILD_ID || "",
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000)
};