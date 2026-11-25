const { kaydet } = require("../utils/logger");
const { sonIslem, AuditLogEvent } = require("../utils/audit");
module.exports = { name: "guildUpdate", async execute(oldGuild, newGuild) {
  const entry = await sonIslem(newGuild, AuditLogEvent.GuildUpdate, newGuild.id);
  await kaydet(newGuild, "guild_update", `Sunucu ayarları değiştirildi.${entry ? ` İşlemi yapan: <@${entry.executor.id}>` : " Fail doğrulanamadı."}`, { actorId: entry?.executor?.id });
}};