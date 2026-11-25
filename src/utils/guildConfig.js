const GuildConfig = require("../models/GuildConfig");
async function ayarlar(guildId) {
  return GuildConfig.findOneAndUpdate(
    { guildId }, { $setOnInsert: { guildId } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}
module.exports = { ayarlar };