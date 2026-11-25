const { kaydet } = require("../utils/logger");
module.exports = { name: "guildMemberUpdate", async execute(oldMember, newMember) {
  if (oldMember.nickname !== newMember.nickname) {
    await kaydet(newMember.guild, "nickname", `${newMember.user.tag} takma adını değiştirdi: **${oldMember.nickname || "Yok"}** → **${newMember.nickname || "Yok"}**`, { targetId: newMember.id });
  }
  if (oldMember.communicationDisabledUntilTimestamp !== newMember.communicationDisabledUntilTimestamp) {
    const until = newMember.communicationDisabledUntil ? newMember.communicationDisabledUntil.toLocaleString("tr-TR") : "Timeout kaldırıldı";
    await kaydet(newMember.guild, "timeout", `${newMember.user.tag}: ${until}`, { targetId: newMember.id });
  }
}};