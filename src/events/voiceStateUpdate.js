const { kaydet } = require("../utils/logger");
module.exports = { name: "voiceStateUpdate", async execute(oldState, newState) {
  const member = newState.member || oldState.member;
  if (!member) return;
  let action = "ses durumu değişti";
  if (!oldState.channelId && newState.channelId) action = `ses kanalına katıldı: <#${newState.channelId}>`;
  else if (oldState.channelId && !newState.channelId) action = `ses kanalından ayrıldı: <#${oldState.channelId}>`;
  else if (oldState.channelId !== newState.channelId) action = `ses kanalını değiştirdi: <#${oldState.channelId}> → <#${newState.channelId}>`;
  else if (oldState.serverMute !== newState.serverMute) action = newState.serverMute ? "sunucu tarafından susturuldu" : "sunucu susturması kaldırıldı";
  await kaydet(member.guild, "voice", `${member.user.tag} ${action}.`, { targetId: member.id });
}};