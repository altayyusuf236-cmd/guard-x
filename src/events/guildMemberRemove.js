const { kaydet } = require("../utils/logger");
const { sonIslem, AuditLogEvent } = require("../utils/audit");
module.exports = { name: "guildMemberRemove", async execute(member) {
  const entry = await sonIslem(member.guild, AuditLogEvent.MemberKick, member.id);
  const desc = entry ? `${member.user?.tag || member.id} atıldı. İşlemi yapan: <@${entry.executor.id}>` : `${member.user?.tag || member.id} sunucudan ayrıldı. (Atılma doğrulanamadı.)`;
  await kaydet(member.guild, "member_remove", desc, { actorId: entry?.executor?.id, targetId: member.id });
}};