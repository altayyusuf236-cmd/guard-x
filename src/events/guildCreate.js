const { Events } = require("discord.js");
const { kayitOlustur } = require("../utils/logger");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    console.log(`[SUNUCU] Yeni sunucu: ${guild.name} (${guild.id})`);
    await kayitOlustur({
      guildId: guild.id,
      type: "BOT_JOINED_GUILD",
      description: `Bot ${guild.name} sunucusuna eklendi.`,
      details: { guildName: guild.name, memberCount: guild.memberCount }
    });
  }
};
