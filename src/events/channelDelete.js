const { kaydet } = require("../utils/logger");
const { ayarlar } = require("../utils/guildConfig");
const { sonIslem, AuditLogEvent } = require("../utils/audit");
module.exports = { name: "channelDelete", async execute(channel) {
  if (!channel.guild) return;
  const cfg = await ayarlar(channel.guild.id);
  const entry = await sonIslem(channel.guild, AuditLogEvent.ChannelDelete, channel.id);
  await kaydet(channel.guild, "channel_delete", `Kanal silindi: **${channel.name}**.${entry ? ` İşlemi yapan: <@${entry.executor.id}>` : " Fail doğrulanamadı."}`, { actorId: entry?.executor?.id, targetId: channel.id });
  if (cfg.guardEnabled && entry?.executor && !cfg.whitelist.includes(entry.executor.id) && entry.executor.id !== channel.guild.ownerId) {
    await kaydet(channel.guild, "guard_channel_delete", `Şüpheli kanal silme işlemi: **${channel.name}**, yapan <@${entry.executor.id}>. Otomatik ceza uygulanmadı; yönetici incelemesi gerekli.`, { guard: true, actorId: entry.executor.id, targetId: channel.id });
  }
}};