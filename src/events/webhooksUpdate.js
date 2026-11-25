const { kaydet } = require("../utils/logger");
const { sonIslem, AuditLogEvent } = require("../utils/audit");
module.exports = { name: "webhooksUpdate", async execute(channel) {
  const entry = await sonIslem(channel.guild, AuditLogEvent.WebhookCreate, null);
  await kaydet(channel.guild, "webhook_update", `Webhook değişikliği algılandı. Kanal: <#${channel.id}>.${entry?.executor ? ` İşlemi yapan: <@${entry.executor.id}>` : " Fail doğrulanamadı."}`, { guard: true, actorId: entry?.executor?.id });
}};