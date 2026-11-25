const { kaydet } = require("../utils/logger");
const { ayarlar } = require("../utils/guildConfig");
const { sonIslem, AuditLogEvent } = require("../utils/audit");
module.exports = { name: "roleDelete", async execute(role) {
  const cfg = await ayarlar(role.guild.id);
  const entry = await sonIslem(role.guild, AuditLogEvent.RoleDelete, role.id);
  await kaydet(role.guild, "role_delete", `Rol silindi: **${role.name}**.${entry ? ` İşlemi yapan: <@${entry.executor.id}>` : " Fail doğrulanamadı."}`, { actorId: entry?.executor?.id, targetId: role.id });
  if (cfg.guardEnabled && entry?.executor && !cfg.whitelist.includes(entry.executor.id) && entry.executor.id !== role.guild.ownerId) {
    await kaydet(role.guild, "guard_role_delete", `Şüpheli rol silme işlemi: **${role.name}**, yapan <@${entry.executor.id}>. Otomatik ceza uygulanmadı; yönetici incelemesi gerekli.`, { guard: true, actorId: entry.executor.id, targetId: role.id });
  }
}};