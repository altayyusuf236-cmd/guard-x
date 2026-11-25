const { AuditLogEvent } = require("discord.js");

async function sonIslem(guild, type, targetId, maxAge = 12000) {
  try {
    const logs = await guild.fetchAuditLogs({ type, limit: 6 });
    const now = Date.now();
    return logs.entries.find(e =>
      (!targetId || e.target?.id === targetId) &&
      now - e.createdTimestamp <= maxAge
    ) || null;
  } catch {
    return null;
  }
}
module.exports = { sonIslem, AuditLogEvent };