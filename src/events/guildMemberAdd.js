const { kaydet } = require("../utils/logger");
const { ayarlar } = require("../utils/guildConfig");
const joins = new Map();
module.exports = { name: "guildMemberAdd", async execute(member) {
  await kaydet(member.guild, "member_join", `${member.user.tag} sunucuya katıldı.`, { targetId: member.id });
  const cfg = await ayarlar(member.guild.id);
  if (!cfg.raid.enabled || !cfg.guardEnabled) return;
  const now = Date.now(), list = (joins.get(member.guild.id) || []).filter(t => now - t < cfg.raid.windowMs);
  list.push(now); joins.set(member.guild.id, list);
  if (list.length >= cfg.raid.joinLimit) {
    await kaydet(member.guild, "raid_alert", `Olası raid tespit edildi: ${list.length} üye ${Math.round(cfg.raid.windowMs / 1000)} saniyede katıldı.`, { guard: true });
  }
}};