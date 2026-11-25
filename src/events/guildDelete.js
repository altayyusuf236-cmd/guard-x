const { Events } = require("discord.js");
const { kayitOlustur } = require("../utils/logger");

module.exports = {
  name: Events.GuildDelete,
  async execute(guild) {
    console.log(`[SUNUCU] Sunucudan ayrılındı/erişim kaybedildi: ${guild.id}`);
    await kayitOlustur({
      guildId: guild.id,
      type: "BOT_LEFT_GUILD",
      description: `${guild.name || guild.id} sunucusundan ayrılındı veya sunucu erişimi kaybedildi.`,
      details: { guildName: guild.name || null }
    });
  }
};
