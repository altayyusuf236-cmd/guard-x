const { kaydet } = require("../utils/logger");
module.exports = { name: "messageUpdate", async execute(oldMsg, newMsg) {
  if (!newMsg.guild || newMsg.author?.bot || oldMsg.content === newMsg.content) return;
  await kaydet(newMsg.guild, "message_edit", `${newMsg.author?.tag} mesajını düzenledi. Kanal: <#${newMsg.channelId}>\\nÖnce: ${(oldMsg.content || "[bilinmiyor]").slice(0, 500)}\\nSonra: ${(newMsg.content || "").slice(0, 500)}`, { targetId: newMsg.author?.id });
}};