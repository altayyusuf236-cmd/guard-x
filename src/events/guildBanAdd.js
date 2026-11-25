const { kaydet } = require("../utils/logger");
const { sonIslem, AuditLogEvent } = require("../utils/audit");
module.exports = { name: "guildBanAdd", async execute(ban) {
  const entry = await sonIslem(ban.guild, AuditLogEvent.MemberBanAdd, ban.user.id);
  await kaydet(ban.guild, "member_ban", `${ban.user.tag} yasaklandı.${entry ? ` İşlemi yapan: <@${entry.executor.id}>` : " Fail audit logdan doğrulanamadı."}`, { actorId: entry?.executor?.id, targetId: ban.user.id });
}};