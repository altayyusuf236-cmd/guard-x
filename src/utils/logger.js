const SystemLog = require("../models/SystemLog");
const GuildConfig = require("../models/GuildConfig");

async function kaydet(guild, type, description, options = {}) {
  if (!guild) return;
  try {
    await SystemLog.create({
      guildId: guild.id, type,
      actorId: options.actorId || null,
      targetId: options.targetId || null,
      details: { description, ...(options.details || {}) }
    });
  } catch (e) {
    console.error("[LOG DB]", e.message);
  }

  try {
    const cfg = await GuildConfig.findOne({ guildId: guild.id });
    const channelId = options.guard ? cfg?.guardLogChannelId : cfg?.normalLogChannelId;
    if (!channelId) return;
    const channel = guild.channels.cache.get(channelId) ||
      await guild.channels.fetch(channelId).catch(() => null);
    if (!channel?.isTextBased()) return;
    const title = options.guard ? "GUARD X | KORUMA KAYDI" : "GUARD X | SUNUCU KAYDI";
    const content = `**${title}**\n${description}`.slice(0, 1900);
    await channel.send({ content }).catch(() => null);
  } catch (e) {
    console.error("[LOG CHANNEL]", e.message);
  }
}

module.exports = { kaydet };