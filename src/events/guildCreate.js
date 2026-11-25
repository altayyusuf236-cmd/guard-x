const { kaydet } = require("../utils/logger");
module.exports = { name: "guildCreate", async execute(guild) {
  console.log(`[SUNUCU] Eklendi: ${guild.name} (${guild.id})`);
  await kaydet(guild, "guild_join", `Bot sunucuya eklendi: **${guild.name}**`);
}};